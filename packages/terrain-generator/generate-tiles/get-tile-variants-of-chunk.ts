import type { IGroundTiles } from "../types/types";


export function getTileVaraintsOfChunk(chunkNoise: number[][], tileTypes: IGroundTiles[][] ): number[][] {
  const variants: number[][] = Array.from(chunkNoise, () => [])

  for(let x = 0; x < chunkNoise.length; x++) {
    for(let y = 0; y < chunkNoise[x].length; y++) {
      if(tileTypes[x][y] == "grass") {
        const noise = chunkNoise[x][y]
        if(noise < 0.6) {
          variants[x][y] = 0 
        }
        else if(noise < 0.85) {
          variants[x][y] = 1
        }
        else {
          variants[x][y] = 2
        }
      }
    }
  }

  return variants
}
