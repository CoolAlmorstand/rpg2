import * as PIXI from "pixi.js"
import type { IScreen } from "../../interfaces/IScreen";

import loadBookPanel from "./book-panel";

export class MainMenuSceen implements IScreen {
  displayContainer: PIXI.Container = new PIXI.Container({
    layout: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    }
  }) 
  on: PIXI.EventEmitter = new PIXI.EventEmitter()
  constructor() {
    this.load()
  }

  async load() {
    await this.construckBookPanel() 
    this.on.emit("screen-loaded")
  } 
  async construckBookPanel(){
    const bookPanel = await loadBookPanel()
    this.displayContainer.addChild(bookPanel)
    this.displayContainer.layout?.forceUpdate()
  }
}
