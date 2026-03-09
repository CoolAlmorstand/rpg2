
import "@pixi/layout"
import { Application } from 'pixi.js'
// import { Game } from './game/game'
import { DisplayManager } from './display-manager/display-manger'
import { MainMenuSceen } from './screens/main-menu/main-menu'
import type { IScreen } from './interfaces/IScreen'

async function createApp() {
  const appContainer: HTMLElement = document.getElementById("app")!
  const app = new Application()
  await app.init({
    resizeTo: window,
    backgroundColor: "#fdf8d4"
  })

  const displayManger = new DisplayManager()

  app.stage.layout = {
    width: app.screen.width,
    height: app.screen.height,
    justifyContent: "center",
    alignItems: "center"
  }
  
  await addScreens(displayManger) 
  app.stage.addChild(displayManger.displayContainer)
  appContainer.appendChild(app.canvas)

}


async function addScreens(displayManger: DisplayManager) {
  const mainMenuScreen: IScreen = new MainMenuSceen()
  displayManger.addScreen("main-menu", mainMenuScreen.displayContainer)
  displayManger.showScreen("main-menu") 
}


createApp()
