import { Application } from 'pixi.js'
// import { Game } from './game/game'
import { DisplayManager } from './display-manager/display-manger'
import { MainMenuSceen } from './screens/main-menu/main-menu'
import type { IScreen } from './interfaces/IScreen'

async function createApp() {
  const appContainer: HTMLElement = document.getElementById("app")!
  const displayManger = new DisplayManager()

  const app = new Application()
  await app.init({
    resizeTo: window,
    backgroundColor: "#fdf8d4"
  })
  app.stage.addChild(displayManger.displayContainer)
  appContainer.appendChild(app.canvas)

  addScreens(displayManger) 
}


async function addScreens(displayManger: DisplayManager) {
  const mainMenuScreen: IScreen = new MainMenuSceen()
  mainMenuScreen.centerHorizontally()
  displayManger.addScreen("main-menu", mainMenuScreen.displayContainer)
  displayManger.showScreen("main-menu") 
}


createApp()
