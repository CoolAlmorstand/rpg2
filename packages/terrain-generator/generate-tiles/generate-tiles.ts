import type { IChunkBiome, IChunkGroundTiles, IGroundTile, IGroundTilesTypes } from "../types/types.ts"

import { generateSimplexNoiseOfChunk } from "../utils/generate-simplex-noise/generate-simplex-noise.ts"
import { getTileTypesOfChunk } from "./get-tile-types-of-chunk.ts"
import { getTileVaraintsOfChunk } from "./get-tile-variants-of-chunk.ts"


function generateVariants(tileType: IGroundTilesTypes, seed: string, startingTileX: number, startingTileY: number, chunkSize: number): number[][] {
  const variants: number[][] = Array.from({length: chunkSize}, () => [] )
  const chunkNoise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 1, 0.8, 1, 0.12, 0.5)
  
  if(tileType == "grass" || true) {

    for(let x = 0; x < x; x++) {
      for(let y = 0; y < y; y++) {
        const noise = chunkNoise[x][y]
        if(noise < 0.7) {
          variants[x][y] = 0
        }
        else {
          variants[x][y] = 1
        }
      }
    }
  }

  return variants
}


function generateLayer(tileType: IGroundTilesTypes, seed: string, startingTileX: number, startingTileY: number, chunkSize: number): IGroundTile[][] {
  const tiles: (IGroundTile | null )[][] = Array.from({length: chunkSize}, () => [] )
  
  if(tileType == "grass") {
    const noise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 1, 0.8, 1, 0.12, 0.5)
    const variants = generateVariants(tileType, seed, startingTileX, startingTileY, chunkSize)

    for(let x = 0; x < x; x++) {
      for(let y = 0; y < y; y++) {
        if(noise[x][y] > 0.7 ) {
          tiles[x][y] = {
            variant: variants[x][y]  
          }
        }
        else {
          tiles[x][y] == null
        }
      } 
    }
  }
  else if(tileType == "dirt") {
    const noise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 1, 0.8, 1, 0.12, 0.5)
    const variants = generateVariants(tileType, seed, startingTileX, startingTileY, chunkSize)

    for(let x = 0; x < x; x++) {
      for(let y = 0; y < y; y++) {
        if(noise[x][y] > 0 ) {
          tiles[x][y] = {
            variant: variants[x][y]  
          }
        }
        else {
          tiles[x][y] == null
        }
      } 
    }
  }

  return tiles
}

export function generateTilesOfChunk(seed: string, startingTileX: number, startingTileY: number, chunkSize: number, chunkBiomes: IChunkBiome,): IChunkGroundTiles { 
  const dirtTiles = generateLayer("dirt", seed, startingTileX, startingTileY, chunkSize )
  const grassTiles = generateLayer("grass", seed, startingTileX, startingTileY, chunkSize )
  
  return {
    dirt: dirtTiles, 
    grass: grassTiles,
  }
}








