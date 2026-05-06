import type { IChunkBiome, IGroundTilesTypes } from "../types/types.ts"
import { generateSimplexNoiseOfChunk } from "../utils/utils.ts"

export function getTileTypesOfChunk(chunkBiomes: IChunkBiome, seed: string, startingTileX: number, startingTileY: number, chunkSize: number): IGroundTilesTypes[][] {
  const types: IGroundTilesTypes[][] = Array.from({length: chunkSize}, () => [])
  
  const plainsChunkNoise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 1, 0.8, 1, 0.12, 0.5)
  const desertChunkNoise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 2, 1, 0.8, 1, 0.15, 0.5)

  for(let x = 0; x < chunkSize; x++) {
    for(let y = 0; y < chunkSize; y++) {
      if(chunkBiomes.types[x][y] == "plains") {
        const noise = plainsChunkNoise[x][y]
        if(noise < 0.7) {
          types[x][y] = "grass-light"
        }
        else if(noise < 0.8) {
          types[x][y] = "grass"
        }
        else {
          types[x][y] = "grass-dark"
        }
      }
      else if(chunkBiomes.types[x][y] == "desert") {
        const noise = desertChunkNoise[x][y]
        if(noise < 0.7) {
          types[x][y] = "sand"
        }
        else {
          types[x][y] = "red-sand"
        }
      }
      else {
        types[x][y] = "grass"
      }
    }
  } 

  return types
}
