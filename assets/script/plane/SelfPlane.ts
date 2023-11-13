
import { _decorator, AudioSource, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../frameWork/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = SelfPlane
 * DateTime = Sat Oct 28 2023 17:38:58 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = SelfPlane.ts
 * FileBasenameNoExtension = SelfPlane
 * URL = db://assets/script/SelfPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    public lifeValue = 5
    public isDie = false

    private _currLife = 0
    private _audioSource: AudioSource = null

    start() {
        this._audioSource = this.getComponent(AudioSource)
    }

    onEnable() {
        const collider = this.getComponent(Collider)
        collider.on('onTriggerEnter', this._onTriggerEnter, this)
    }

    onDisable() {
        const collider = this.getComponent(Collider)
        collider.off('onTriggerEnter', this._onTriggerEnter, this)
    }

    public init() {
        this._currLife = this.lifeValue
        this.isDie = false
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup()
        if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || collisionGroup === Constant.CollisionType.ENEMY_BULLET) {
            console.log('reduce blood');
            this._currLife--
            if (this._currLife <= 0) {
                this.isDie = true
                this._audioSource.play()
            }
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
