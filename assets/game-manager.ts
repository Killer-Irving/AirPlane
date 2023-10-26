import { _decorator, Component, Material, MeshRenderer, Node } from "cc";
const { ccclass, property, executeInEditMode, menu, requireComponent } =
  _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Thu Oct 26 2023 23:15:08 GMT+0800 (台北标准时间)
 * Author = Killer_Irving
 * FileBasename = game-manager.ts
 * FileBasenameNoExtension = game-manager
 * URL = db://assets/game-manager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass("GameManager")
@executeInEditMode(true)
@requireComponent(MeshRenderer)
@menu("manager/GameManager")
export class GameManager extends Component {
  @property
  public foo = 10;

  @property(Material)
  public bar: Material = null;

  start() {}

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
