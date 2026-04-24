import type { IMapRenderer } from "$lib/interfaces/IMapRenderer";
import type { ITerrainGenerator, IBiomeTypes } from "@terabithia/terrain-generator";
import * as PIXI from "pixi.js"
import waterSprite from "$lib/assets/water.jpg"
import grassSprite from "$lib/assets/grass.jpg"
import forestImage from "$lib/assets/forest.jpg"
import sandImage from "$lib/assets/sand.jpg"
import snowImage from "$lib/assets/snow.jpg"

const BIOME_COLORS: Record<string, string> = {
  plains:   "#7EC850",
  forest:   "#2D6A2D",
  ocean:    "#1A6FBF",
  snow:     "#E8F0F7",
  desert:   "#D4A84B",
  mountain: "#8B7355",
  valye:    "#9A9A9A",
};


export class MapRenderer implements IMapRenderer {  
  chunkSize: number;
  tileSize: number; 
  tileSprites!: Record<IBiomeTypes, PIXI.Texture>
  renderer: PIXI.Renderer;
  mapOFfset: { x: number; y: number } = { x: 0, y: 0 }
  screenSize: {width: number, height: number}
  terrainGenerator: ITerrainGenerator
  container: PIXI.Container = new PIXI.Container()
  // key is chuck cords "xy" example 2,6
  private loadedChunks: Record<string, {
    x: number;
    y: number;
    container: PIXI.Container
  }> = {}

  constructor(renderer: PIXI.Renderer, terrainGenerator: ITerrainGenerator, chunkSize: number, tileSize: number, screenSize: {width: number, height: number} ) {
    this.chunkSize = chunkSize 
    this.terrainGenerator = terrainGenerator
    this.tileSize = tileSize 
    this.renderer = renderer
    this.screenSize = screenSize
  }
  
  async init() {
    this.tileSprites = {
      plains: await PIXI.Assets.load(grassSprite),
      ocean: await PIXI.Assets.load(waterSprite),
      forest: await PIXI.Assets.load(forestImage),
      snow: await PIXI.Assets.load(snowImage),
      desert: await PIXI.Assets.load(sandImage),
      valye: await PIXI.Assets.load(grassSprite),
      mountain: await PIXI.Assets.load(grassSprite),
    }
  }

  async drawChunk(chunkX: number, chunkY: number): Promise<void> {
    if(this.loadedChunks[`${chunkX},${chunkY}`]) {
      return 
    }

    const chunkContainer = new PIXI.Container()
    const chunkTerrain = this.terrainGenerator.generateChunk(chunkX, chunkY)
  
    for(const layer of Object.values(chunkTerrain)) {
      for(let x = 0; x < layer.types.length; x++) {
        for(let y = 0; y < layer.types[x].length; y++) {
          const sprite = new PIXI.Sprite(this.tileSprites[layer.types[x][y]])
       
          sprite.x = x * this.tileSize 
          sprite.y = y * this.tileSize 
          chunkContainer.addChild(sprite)
        }
      }
    }

    chunkContainer.x = this.chunkSize * this.tileSize * chunkX
    chunkContainer.y = this.chunkSize * this.tileSize * chunkY
    this.loadedChunks[`${chunkX},${chunkY}`] = {
      container: chunkContainer,
      x: chunkX,
      y: chunkY
    }
    this.container.addChild(chunkContainer)
  }

  moveMap(x: number, y: number): void {
    this.container.x += x     
    this.container.y += y 
    this.drawMap()
  }
  
  zoomMap(zoom: number): void {
    const previousScale = this.container.scale.x
    this.container.scale.set(previousScale + zoom, previousScale + zoom) 
    this.drawMap() 
  }

  drawMap() {
    const {startingX, startingY, endingX, endingY} = this.getVisibleChunks()
    console.log({
      startingX,
      startingY,
      endingY,
      endingX
    })
    this.unloadNotVisibleChunks(startingX, startingY, endingX, endingY )
  
    for(let x = startingX; x < endingX; x++) {
      for(let y = startingY; y < endingY; y++) {
        this.drawChunk(x, y) 
      }
    }
  }
  
  private unloadNotVisibleChunks(startingX: number, startingY: number, endingX: number, endingY: number) {
    for(const loadedChunk of Object.values(this.loadedChunks) ) { 
      if(loadedChunk.x < startingX || loadedChunk.x > endingX) {
        this.container.removeChild(loadedChunk.container)
        delete this.loadedChunks[`${loadedChunk.x},${loadedChunk.y}`]
      }
      else if(loadedChunk.y < startingY || loadedChunk.y > endingY) {
        this.container.removeChild(loadedChunk.container)
        delete this.loadedChunks[`${loadedChunk.x},${loadedChunk.y}`]
      }
    }
  }

  private getVisibleChunks(): {startingX: number; startingY: number; endingY: number; endingX: number} {
    const adjustedChunkSize = (this.chunkSize * this.tileSize) * this.container.scale.x
    const absouluteContainerOffsetX = this.container.x * -1
    const absouluteContainerOffsetY = this.container.y * -1

    const startingX = Math.max(0, Math.floor( 
      absouluteContainerOffsetX / adjustedChunkSize  
    ))

    const startingY = Math.max(0 , Math.floor( 
      absouluteContainerOffsetY / adjustedChunkSize 
    ))

    const endingX = startingX + Math.ceil(this.screenSize.width / adjustedChunkSize )  
    const endingY = startingY + Math.ceil(this.screenSize.height / adjustedChunkSize )  

    return {
      startingX,
      startingY,
      // add one for buffer
      endingX: endingX + 1,
      endingY: endingY + 1
    }
  } 
}
