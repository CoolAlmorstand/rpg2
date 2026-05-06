import type { IMapRenderer } from "$lib/interfaces/IMapRenderer";
import type { ITerrainGenerator, IBiomeTypes, IChunkGroundTiles } from "@terabithia/terrain-generator";

import * as PIXI from "pixi.js"

import type { IGroundTilesetsTextureMap } from "$lib/interfaces/ITilesetLoader";
import type { IChunkTerrain, IGroundTilesTypes } from "../../../../../packages/terrain-generator/types/types.ts";
import { getBlendingEdgeTexture } from "./get-texture-of-blending-edge.ts";

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
  groundTileSprites: IGroundTilesetsTextureMap; 
  renderer: PIXI.Renderer;
  mapOFfset: { x: number; y: number } = { x: 0, y: 0 }
  screenSize: {width: number, height: number}
  terrainGenerator: ITerrainGenerator
  container: PIXI.Container = new PIXI.Container()
  // key is chuck cords "xy" example 2,6
  private loadedChunks: Record<string, {
    x: number;
    y: number;
    sprite: PIXI.Sprite
  }> = {}

  constructor(renderer: PIXI.Renderer, terrainGenerator: ITerrainGenerator, groundTileSprites: IGroundTilesetsTextureMap, chunkSize: number, tileSize: number, screenSize: {width: number, height: number} ) {
    this.chunkSize = chunkSize 
    this.groundTileSprites = groundTileSprites
    this.terrainGenerator = terrainGenerator
    this.tileSize = tileSize 
    this.renderer = renderer
    this.screenSize = screenSize
  }
  
  async init() {
    
  }
  
  private getTextureOfGroundTile(x: number, y: number, tileType: IGroundTilesTypes, groundTiles: IChunkGroundTiles ): PIXI.Texture {

    const topLeftTile = groundTiles[tileType][Math.max(0, x - 1)][Math.max(0, y - 1)]
    const topRightTile = groundTiles[tileType][x][Math.max(0, y - 1)]
    const bottomLeftTile = groundTiles[tileType][Math.max(0, x - 1)][y]
    const bottomRightTile = groundTiles[tileType][x][y]

    if(topLeftTile  )
  }

  private drawGroundTilesOfChunk(chunkTerrain: IChunkTerrain): PIXI.Container {
    const groundTiles = chunkTerrain.groundTiles  
    const container = new PIXI.Container()
    
    for(const [tileType, tiles] of Object.entries(groundTiles)) {
      for(let x = 0; x < this.chunkSize; x++) {
        for(let y = 0; y < this.chunkSize; y++) {
          const tile = tiles[x][y]
          if(!tiles[x][y]) {
            continue
          }
          const tileTexure = this.getTextureOfGroundTile(x, y, groundTiles) 

          const tileSprite = new PIXI.Sprite(tileTexure)
          tileSprite.x = x * this.tileSize 
          tileSprite.y = y * this.tileSize
          
          container.addChild(tileSprite)
          // console.log(blendingEdges)
          //add blending edges
          
          const blendingEgdeTexture = getBlendingEdgeTexture(tileType, blendingEdges[x][y], this.groundTileSprites) 
          if(blendingEgdeTexture) {
            const blendingEgdeSprite = new PIXI.Sprite(blendingEgdeTexture)
            blendingEgdeSprite.x = x * this.tileSize
            blendingEgdeSprite.y = y * this.tileSize
            container.addChild(blendingEgdeSprite)
          }
        }
      }
    }
 
    return container
  }
  
  async drawChunk(chunkX: number, chunkY: number): Promise<void> {
    if(this.loadedChunks[`${chunkX},${chunkY}`]) {
      return 
    }

    const chunkTerrain = this.terrainGenerator.generateChunk(chunkX, chunkY)
    console.log(chunkTerrain)
    const chunkContainer = new PIXI.Container()
    
    const groundTiles = this.drawGroundTilesOfChunk(chunkTerrain) 
    chunkContainer.addChild(groundTiles)

    const chunkTexture = PIXI.RenderTexture.create({
      width: this.chunkSize * this.tileSize,
      height: this.chunkSize * this.tileSize,
      scaleMode: "nearest",
      autoGenerateMipmaps: false,
    })

    this.renderer.render({
      target: chunkTexture,
      container: chunkContainer,
      clear: true
    })

    const chunkSpirte = new PIXI.Sprite(chunkTexture)
    chunkSpirte.x = this.chunkSize * this.tileSize * chunkX 
    chunkSpirte.y = this.chunkSize * this.tileSize * chunkY 
    
    this.loadedChunks[`${chunkX},${chunkY}`] = {
      x: chunkX,
      y: chunkY,
      sprite: chunkSpirte
    }
    this.container.addChild(chunkSpirte)
  }

  moveAndZoomMap(x: number, y: number, zoom: number): void {
    this.container.x += x     
    this.container.y += y 

    const previousScale = this.container.scale.x
    this.container.scale.set(previousScale + zoom, previousScale + zoom) 
    this.drawMap()

  }
  
  drawMap() {
    // let x = 0 
    // let y = 0
    // for(const texure of Object.values(this.groundTileSprites.grass.blendingEdges)) {
    //   const sprite = new PIXI.Sprite(texure)
    //   sprite.x = x 
    //   sprite.y = y
    //   this.container.addChild(sprite)
    //   x += 17
    // }
    //
    // x = 0 
    // y = 16
    //
    // for(const texure of Object.values(this.groundTileSprites["grass-dark"].blendingEdges)) {
    //   const sprite = new PIXI.Sprite(texure)
    //   sprite.x = x 
    //   sprite.y = y
    //   this.container.addChild(sprite)
    //   x += 17
    // }
    // x = 0 
    // y = 32
    //
    // for(const texure of Object.values(this.groundTileSprites["grass-light"].blendingEdges)) {
    //   const sprite = new PIXI.Sprite(texure)
    //   sprite.x = x 
    //   sprite.y = y
    //   this.container.addChild(sprite)
    //   x += 17
    // }
    //
    // this.container.scale.set(2,2)
    // this.container.y = 100
    // this.container.x = -70


    const {startingX, startingY, endingX, endingY} = this.getVisibleChunks()
    // console.log({
    //   startingX,
    //   startingY,
    //   endingY,
    //   endingX
    // })
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
        this.container.removeChild(loadedChunk.sprite)
        delete this.loadedChunks[`${loadedChunk.x},${loadedChunk.y}`]
      }
      else if(loadedChunk.y < startingY || loadedChunk.y > endingY) {
        this.container.removeChild(loadedChunk.sprite)
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
