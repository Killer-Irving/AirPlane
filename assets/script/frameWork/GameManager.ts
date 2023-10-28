
import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { Constant } from './Constant';
import { EnemyPlane } from '../plane/EnemyPlane';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Sat Oct 28 2023 19:47:33 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/script/frameWork/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null
    @property(Prefab)
    //bullet
    public bullet01: Prefab = null
    @property(Prefab)
    public bullet02: Prefab = null
    @property(Prefab)
    public bullet03: Prefab = null
    @property(Prefab)
    public bullet04: Prefab = null
    @property(Prefab)
    public bullet05: Prefab = null
    @property
    public shootTime = 0.3
    @property
    public bulletSpeed = 1
    @property(Node)
    public bulletRoot: Node = null

    //enemy
    @property(Prefab)
    public enemy01: Prefab = null
    @property(Prefab)
    public enemy02: Prefab = null
    @property
    public createEnemyTime = 1
    @property
    public enemy1Speed = 0.5
    @property
    public enemy2Speed = 0.7


    private _currShootTime = 0
    private _isShooting = false
    private _currCreateEnemyTime = 0
    private _combinationInterval = Constant.Combination.PLAN1


    start() {
        this._init()
    }

    update(deltaTime: number) {
        this._currShootTime += deltaTime
        if (this._isShooting && this._currShootTime > this.shootTime) {
            this.createPlayerBullet()
            this._currShootTime = 0
        }

        if (this._combinationInterval === Constant.Combination.PLAN1) {
            this._currCreateEnemyTime += deltaTime
            if (this._currCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane()
                this._currCreateEnemyTime = 0
            }
        } else if (this._combinationInterval === Constant.Combination.PLAN2) {

        } else {

        }
    }

    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01)
        bullet.setParent(this.bulletRoot)
        const pos = this.playerPlane.position
        bullet.setPosition(pos.x, pos.y, pos.z - 7)
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.bulletSpeed = this.bulletSpeed
    }

    public createEnemyPlane() {
        const whichEnemy = math.randomRangeInt(1, 3)
        let prefab: Prefab = null
        let speed = 0
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01
            speed = this.enemy1Speed
        } else {
            prefab = this.enemy02
            speed = this.enemy2Speed
        }

        const enemy = instantiate(prefab)
        enemy.setParent(this.node)
        const enemyComp = enemy.getComponent(EnemyPlane)
        enemyComp.show(speed)

        const randomPos = math.randomRangeInt(-25, 26)
        enemy.setPosition(randomPos, 0, -50)
    }

    public isShooting(value: boolean) {
        this._isShooting = value
    }

    private _init() {
        this._currShootTime = this.shootTime
        this.changePlaneMode()
    }

    private changePlaneMode() {
        this.schedule(this._modeChanged, 10, 3)
    }

    private _modeChanged() {
        this._combinationInterval++
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