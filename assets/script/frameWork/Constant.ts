
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Constant
 * DateTime = Sat Oct 28 2023 20:41:05 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = Constant.ts
 * FileBasenameNoExtension = Constant
 * URL = db://assets/script/frameWork/Constant.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Constant')
export class Constant {
    public static EnemyType = {
        TYPE1: 1,
        TYPE2: 2,
    }

    public static Combination = {
        PLAN1: 1,
        PLAN2: 1,
        PLAN3: 1,
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