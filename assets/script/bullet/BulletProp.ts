
import { _decorator, Collider, Component, ITriggerEvent, Node } from 'cc';
import { GameManager } from '../frameWork/GameManager';
import { Constant } from '../frameWork/Constant';
import { PoolManager } from '../frameWork/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BulletProp
 * DateTime = Thu Nov 02 2023 00:14:10 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = BulletProp.ts
 * FileBasenameNoExtension = BulletProp
 * URL = db://assets/script/bullet/BulletProp.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('BulletProp')
export class BulletProp extends Component {
    private _propSpeed = 0.3
    private _propXSpeed = 0.3
    private _gameManager: GameManager = null


    onEnable() {
        const collider = this.getComponent(Collider)
        collider.on('onTriggerEnter', this._onTriggerEnter, this)
    }

    onDisable() {
        const collider = this.getComponent(Collider)
        collider.off('onTriggerEnter', this._onTriggerEnter, this)
    }

    update(deltaTime: number) {
        let pos = this.node.position
        if (pos.x >= 15) {
            this._propXSpeed = this._propSpeed
        } else if (pos.x <= -15) {
            this._propXSpeed = -this._propSpeed
        }

        this.node.setPosition(pos.x + this._propXSpeed, pos.y, pos.z - this._propSpeed)

        pos = this.node.position
        if (pos.z > 50) {
            PoolManager.instance().putNode(this.node)
        }
    }

    show(gameManager: GameManager, speed: number) {
        this._gameManager = gameManager
        this._propSpeed = speed
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const name = event.selfCollider.node.name
        if (name === 'bulletS') {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_S)
        } else if (name === 'bulletH') {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_H)
        } else {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_M)
        }

        PoolManager.instance().putNode(this.node)
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
