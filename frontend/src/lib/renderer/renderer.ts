import type { IMapRenderer } from "$lib/interfaces/IMapRenderer";
import type { IMap, IRenderer } from "$lib/interfaces/IRenderer";
import type { ITerrainGenerator } from '@terabithia/terrain-generator'
import * as PIXI from "pixi.js"

const BIOME_COLORS: Record<string, string> = {
  plains:   "#7EC850",
  forest:   "#2D6A2D",
  ocean:    "#1A6FBF",
  snow:     "#E8F0F7",
  desert:   "#D4A84B",
  mountain: "#8B7355",
  valye:    "#9A9A9A",
};

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
    this.mapRenderer.moveMap(-2, -3)  
    this.mapRenderer.zoomMap(-0.01)
  }

  startRenderLoop(): void {
    this.app.ticker.start() 
  }
}
