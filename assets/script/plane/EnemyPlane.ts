
import { _decorator, Component, Node } from 'cc';
import { Constant } from '../frameWork/Constant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EnemyPlane
 * DateTime = Sat Oct 28 2023 20:19:18 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = EnemyPlane.ts
 * FileBasenameNoExtension = EnemyPlane
 * URL = db://assets/script/plane/EnemyPlane.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

const OUTOFBOUNCE = 50

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    private _enemySpeed = 0

    start() {
        // [3]
    }

    update(deltaTime: number) {
        const pos = this.node.position
        const movePos = pos.z + this._enemySpeed
        this.node.setPosition(pos.x, pos.y, movePos)

        if (movePos > OUTOFBOUNCE) {
            this.node.destroy()
        }
    }

    show(speed: number) {
        this._enemySpeed = speed
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
