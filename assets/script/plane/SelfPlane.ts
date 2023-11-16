
import { _decorator, AudioSource, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../frameWork/Constant';
import { GameManager } from '../frameWork/GameManager';
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
    @property(Node)
    public explode: Node = null
    @property(Node)
    public bloodFace: Node = null
    @property(Node)
    public blood: Node = null
    public lifeValue = 5
    public isDie = false
    
    public _currLife = 0
    private _audioSource: AudioSource = null
    private _gameManager: GameManager = null

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
        this.explode.active = false
        this.bloodFace.setScale(1, 1, 1)
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
    public _setGameManager(gameManager:GameManager){
        this._gameManager = gameManager
    }

    public _addLife(){
        if(this._currLife === this.lifeValue){
            return
        }

        this._currLife ++
        this._setShootTime()

        if (this._currLife === this.lifeValue) {
            this.blood.active = false
        }
        this.bloodFace.setScale(this._currLife / this.lifeValue, 1, 1)
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const collisionGroup = event.otherCollider.getGroup()
        if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || collisionGroup === Constant.CollisionType.ENEMY_BULLET) {
          
            if(this._gameManager._bulletType === Constant.BulletPropType.BULLET_M){
                if (this._currLife === this.lifeValue) {
                    this.blood.active = true
                }
                this._currLife--
                this.bloodFace.setScale(this._currLife / this.lifeValue, 1, 1)
            }else{
                this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_M)
            }
            this._setShootTime()
            if (this._currLife <= 0) {
                this.isDie = true
                this._audioSource.play()
                this.explode.active = true
                this.blood.active = false
            }
        }
    }

    private _setShootTime(){
        if(this._currLife/this.lifeValue === 2/3){
            this._gameManager.shootTime = Constant.ShootTime.LEVEL_2
        }else if(this._currLife/this.lifeValue === 1/3){
            this._gameManager.shootTime = Constant.ShootTime.LEVEL_3
        }else{
            this._gameManager.shootTime = Constant.ShootTime.LEVEL_1
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
