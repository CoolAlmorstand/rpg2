import type { IChunkBiome, IGroundTilesTypes } from "../types/types.ts"
import { generateSimplexNoiseOfChunk } from "../utils/utils.ts"


export function getHeightValuesOfChunk(chunkBiomes: IChunkBiome, seed: string, startingTileX: number, startingTileY: number, chunkSize: number): number[][] {
  const heights: number[][] = Array.from({length: chunkSize}, () => [])

  const plainsHeightNoise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 1.5, 0.8, 0.3, 0.04, 1 ) 
  
  for (let x = 0; x < chunkSize; x++) {
    for (let y = 0; y < chunkSize; y++) {
      if(chunkBiomes.types[x][y] == "plains") {
        heights[x][y] = parseInt( plainsHeightNoise[x][y].toFixed(1) )
      }
      else {
        heights[x][y] = parseInt( plainsHeightNoise[x][y].toFixed(1) )
      }
    } 
  }

  return heights
}
