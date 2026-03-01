

import * as PIXI from "pixi.js"


export class DisplayManager {
  displayContainer: PIXI.Container = new PIXI.Container()
  screens: Record<string, PIXI.Container> = {}

  constructor() {

  }

  addScreen(screenId: string, screen: PIXI.Container ) {
    this.screens[screenId] = screen
    
  }

  showScreen(screenId: string) {
    const screen = this.screens[screenId]

    if(!screen) { throw new Error(`screen: ${screenId} does not exist`) }
    this.displayContainer.addChild(screen)
  }

  hideScreen(screenId: string) {
    const screen = this.screens[screenId]
    this.displayContainer.removeChild(screen)
  }

  replaceScreen(screenId: string, targetScreenId: string) {
    const screen = this.screens[screenId]
    const targetScreen = this.screens[targetScreenId]

    this.displayContainer.replaceChild(targetScreen, screen)
  }
}
