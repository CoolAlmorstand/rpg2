

import * as PIXI from "pixi.js"
import type { IGame } from "../interfaces/IGame";
import type { InputSignal } from "../interfaces/InputSignal";

export class Game implements IGame {
  app: PIXI.Application;
  arnold!: PIXI.Sprite;
  constructor() {
    this.app = new PIXI.Application()
  }

  async init(container: HTMLElement) {
    await this.app.init({
      resizeTo: container,
      backgroundColor: "blue"
    })

    container.appendChild(this.app.canvas)
  } 
  
  startTicker() {

  }

  sendControlInput(inputSignal: InputSignal):void {

  }
}
