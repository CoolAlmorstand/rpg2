import * as PIXI from "pixi.js"
import type { IScreen } from "../../interfaces/IScreen";
import { construckBookPanel } from "./book-panel/construck-book-panel";

export class MainMenuSceen implements IScreen {
  displayContainer: PIXI.Container = new PIXI.Container({
    layout: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 10
    }
  }) 
  on: PIXI.EventEmitter = new PIXI.EventEmitter()
  constructor() {
    this.load()
  }

  async load() {
    const bookPanel = await construckBookPanel()
    this.displayContainer.addChild(bookPanel)
    this.on.emit("screen-loaded")
  } 
  
}
