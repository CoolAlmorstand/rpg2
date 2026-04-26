
import type { IGroundTiles } from "../types/types.ts"


export function getLayersMappingOfChunk(chunkNoise: number[][], tileTypes: IGroundTiles[][]): number[][] {
  const layersMapping: number[][] = Array.from(chunkNoise, () => [])

  for(let x = 0; x < chunkNoise.length; x++) { 
    for(let y = 0; y < chunkNoise[x].length; y++) {
      if(tileTypes[x][y] == "grass") {
        const noise = chunkNoise[x][y]
        if(noise < 0.5) {
          layersMapping[x][y] = 0
        }
        else if(noise < 0.75) {
          layersMapping[x][y] = 1
        }
        else {
          layersMapping[x][y] = 2
        }
      }
    }
  }

  return layersMapping
}
