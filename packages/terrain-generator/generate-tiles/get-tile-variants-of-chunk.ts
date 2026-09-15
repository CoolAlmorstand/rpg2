import type { IGroundTilesTypes } from "../types/types";
import { generateSimplexNoiseOfChunk } from "../utils/utils";

export function getTileVaraintsOfChunk(seed: string, startingTileX: number, startingTileY: number, chunkSize: number, tileTypes: IGroundTilesTypes[][] ): number[][] {
  const variants: number[][] = Array.from(tileTypes, () => [])

  const grassChunkNoise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 3, 0.8, 1, 0.9, 0.5)
  const sandChunkNoise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 3, 0.8, 1, 0.9, 0.5)
  
  for(let x = 0; x < chunkSize; x++) {
    for(let y = 0; y < chunkSize; y++) {
      if(tileTypes[x][y] == "grass" || tileTypes[x][y] == "grass-light" || tileTypes[x][y] == "grass-dark") {
        const noise = grassChunkNoise[x][y]
        if(noise < 0.65) {
          variants[x][y] = 0 
        }
        else if(noise < 0.85) {
          variants[x][y] = 1
        }
        else {
          variants[x][y] = 2
        }
      }
      else if(tileTypes[x][y] == "sand") {
        const noise = sandChunkNoise[x][y]
        if(noise < 0.65) {
          variants[x][y] = 0 
        } 
        else {
          variants[x][y] = 1
        }
      }
      else {
        variants[x][y] = 0
      }
    }
  }

  return variants
}
