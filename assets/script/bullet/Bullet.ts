
import { _decorator, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Constant } from '../frameWork/Constant';
import { PoolManager } from '../frameWork/PoolManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Sat Oct 28 2023 18:35:09 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = Bullet.ts
 * FileBasenameNoExtension = Bullet
 * URL = db://assets/script/bullet/Bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Bullet')
export class Bullet extends Component {
    private _bulletSpeed = 0
    private _direction = Constant.Direction.MIDDLE
    private _isEnemyBullet = false
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onEnable() {
        const collider = this.getComponent(Collider)
        collider.on('onTriggerEnter', this._onTriggerEnter, this)
    }

    onDisable() {
        const collider = this.getComponent(Collider)
        collider.off('onTriggerEnter', this._onTriggerEnter, this)
    }

    update(deltaTime: number) {
        const pos = this.node.position
        let moveLength = 0
        if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletSpeed
            this.node.setPosition(pos.x, pos.y, moveLength)
            if (moveLength > 50) {
                PoolManager.instance().putNode(this.node)
            }
        } else {
            moveLength = pos.z - this._bulletSpeed
            if (this._direction === Constant.Direction.LEFT) {
                this.node.setPosition(pos.x - this._bulletSpeed * 0.2, pos.y, moveLength)
            } else if (this._direction === Constant.Direction.RIGHT) {
                this.node.setPosition(pos.x + this._bulletSpeed * 0.2, pos.y, moveLength)
            } else {
                this.node.setPosition(pos.x, pos.y, moveLength)
            }

            if (moveLength < -50) {
                PoolManager.instance().putNode(this.node)
            }
        }

    }

    show(speed: number, isEnemyBullet: boolean, direction = Constant.Direction.MIDDLE) {
        this._bulletSpeed = speed
        this._isEnemyBullet = isEnemyBullet
        this._direction = direction
    }

    private _onTriggerEnter(event: ITriggerEvent) {
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
