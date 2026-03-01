import * as PIXI from "pixi.js"
import type { IScreen } from "../../interfaces/IScreen";

import bookCoverImage from "../../assets/ui-sprites/UI_TravelBook_BookCover01a.png"


export class MainMenuSceen implements IScreen {
  displayContainer: PIXI.Container = new PIXI.Container() 
  on: PIXI.EventEmitter = new PIXI.EventEmitter()
  constructor() {
    this.load()
  }

  async load() {
    const loadedBookCoverImage = await PIXI.Assets.load(bookCoverImage)
    const bookCoverSprite = new PIXI.Sprite(loadedBookCoverImage)
    bookCoverSprite.anchor.set(0.5, 0)
    this.displayContainer.addChild(bookCoverSprite)
    this.on.emit("screen-loaded")
  }

  centerHorizontally(){
    this.displayContainer.x = window.innerWidth / 2
  } 
}
