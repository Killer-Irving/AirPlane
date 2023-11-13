
import { _decorator, Component, Touch, EventTouch, Node, SystemEvent, log } from 'cc';
import { GameManager } from '../frameWork/GameManager';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIMain
 * DateTime = Sat Oct 28 2023 17:53:06 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = UIMain.ts
 * FileBasenameNoExtension = UIMain
 * URL = db://assets/script/ui/UIMain.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('UIMain')
export class UIMain extends Component {
    @property
    public planeSpeed = 1

    @property(Node)
    public playerPlane: Node = null

    @property(GameManager)
    public gameManager: GameManager = null

    @property(Node)
    public gameStart: Node = null
    @property(Node)
    public game: Node = null
    @property(Node)
    public gameOver: Node = null


    start() {
        this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this)
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this)
        this.node.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this)


        this.gameStart.active = true
    }

    public reStart() {
        this.gameOver.active = false
        this.game.active = true
        this.gameManager.playAudioEffect('button')
        this.gameManager.gameReStart()
    }

    public returnMain() {
        this.gameOver.active = false
        this.gameStart.active = true
        this.gameManager.playAudioEffect('button')
        this.gameManager.returnMain()
    }

    _touchStart(touch: Touch, EventType: EventTouch) {
        if (this.gameManager.isGameStart) {
            this.gameManager.isShooting(true)
        } else {
            this.gameStart.active = false
            this.game.active = true
            this.gameManager.playAudioEffect('button')
            this.gameManager.gameStart()
        }
    }

    _touchMove(touch: Touch, EventType: EventTouch) {
        if (!this.gameManager.isGameStart) {
            return
        }

        const delta = touch.getDelta()
        let pos = this.playerPlane.position
        this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y)
    }

    _touchEnd(touch: Touch, EventType: EventTouch) {
        if (!this.gameManager.isGameStart) {
            return
        }

        this.gameManager.isShooting(false)
    }


    // update (deltaTime: number) {
    //     // [4]
    // }
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
