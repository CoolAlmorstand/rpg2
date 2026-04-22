
import { createCellularNoiseMap } from "../utils/utils.ts";
import type { ILayer, IBiomeTypes } from "../types/types";

function getBiomeOfNoiseVal(noise: number): IBiomeTypes {
  if(noise < 0.3) {
    return "plains"
  }
  else if(noise < 0.45) {
    return "forest"
  } 
  else if(noise < 0.7) {
    return "ocean"
  }
  else if(noise < 0.8) {
    return "desert"
  }
  else if(noise < 0.85) {
    return "snow"
  }
  else if(noise < 0.95) {
    return "mountain"
  }
  else {
    return "valye"
  }
}


export function generateChunkBiome(seed: string, chunkSize: number, chunkX: number, chunkY: number ): ILayer<IBiomeTypes> {
  const startingTileX = chunkX * chunkSize
  const startingTileY = chunkY * chunkSize
  const noiseMap = createCellularNoiseMap(seed, startingTileX, startingTileY, chunkSize, chunkSize, 0.02, 0.5)
  const biomes: IBiomeTypes[][] = Array.from({length: chunkSize}, () => [])

  for(let x = 0; x < chunkSize; x++) {
    for(let y = 0; y < chunkSize; y++) {
      biomes[x][y] = getBiomeOfNoiseVal(noiseMap[x][y]) 
    }
  }

  return {
    noiseMap,
    types: biomes
  }
}






