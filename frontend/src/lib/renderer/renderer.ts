import type { IMapRenderer } from "$lib/interfaces/IMapRenderer";
import type { IRenderer } from "$lib/interfaces/IRenderer";

import * as PIXI from "pixi.js"

export class Renderer implements IRenderer {
  app: PIXI.Application
  screenSize: {width: number, height: number}
  mapRenderer: IMapRenderer
  constructor(app: PIXI.Application, mapRenderer: IMapRenderer, screenSize: {width: number; height: number } ) {
    this.app = app 
    this.mapRenderer = mapRenderer
    this.screenSize = screenSize
  }

  async init(container: HTMLDivElement): Promise<void> {
    await this.app.init({
      background: "#FF0000",
      resizeTo: container, 
      autoStart: false,
    })

    this.app.stage.addChild(this.mapRenderer.container)

    this.app.ticker.maxFPS = 45
    this.app.ticker.add((tick) => this.renderFrame(tick))

    container.appendChild(this.app.canvas)
  }
  
  async renderMap(): Promise<void> {
    this.mapRenderer.drawMap()    
  }
  
  renderFrame(tick: PIXI.Ticker) {
    this.mapRenderer.moveMap(-5, -5)  
  }

  startRenderLoop(): void {
    this.app.ticker.start() 
  }
}
