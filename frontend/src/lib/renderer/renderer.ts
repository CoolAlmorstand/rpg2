import type { IMap, IRenderer } from "$lib/interfaces/IRenderer";
import * as PIXI from "pixi.js"

export class Renderer implements IRenderer {
  app: PIXI.Application
  constructor() {
    this.app = new PIXI.Application() 
  }

  async init(container: HTMLDivElement): Promise<void> {
    await this.app.init({
      background: "#FF0000",
      resizeTo: container 
    })

    container.appendChild(this.app.canvas)
  }
  
  async renderMap(map: IMap): Promise<void> {
    const mapLayerContainer = new PIXI.Container()
    
    for(let x = 0; x < map.length; x++) {
      for(let y = 0; y < map[x].length; y++) {
        const tile = new PIXI.Graphics()
        tile.rect(x * 5, y * 5, 5, 5)

        if(map[x][y].type == "water") {
          tile.fill("#4DA6FF")
        } 
        else if(map[x][y].type == "sand") {
          tile.fill("#E4D28C")
        }
        else {
          tile.fill("#5DBB63")
        }

        mapLayerContainer.addChild(tile)
      }
    }

    this.app.stage.addChild(mapLayerContainer)
  }
}
