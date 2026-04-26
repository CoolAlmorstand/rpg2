import type { IBiomeTypes, IGroundTiles } from "../types/types.ts"

export function getTileTypesOfChunk(chunkNoise: number[][], chunkBiomes: IBiomeTypes[][] ): IGroundTiles[][] {
  const types: IGroundTiles[][] = Array.from(chunkNoise, () => [])

  for(let x = 0; x < chunkNoise.length; x++) {
    for(let y = 0; y < chunkNoise[x].length; y++) {
      if(chunkBiomes[x][y] == "plains" || true) {
        types[x][y] = "grass"
      } 
    }
  } 

  return types
}
