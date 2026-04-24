import { IBiomeTypes, IGroundTiles } from "../types/types.ts"


export function getTileTypeAndLayerOfChunk(chunkNoise: number[][], chunkBiomes: IBiomeTypes[][]): {layersMapping: number[][]; types: IGroundTiles[][]} {
  const types: IGroundTiles[][] = Array.from(chunkNoise, () => [])
  const layersMapping: number[][] = Array.from(chunkNoise, () => [])

  for(let x = 0; x < chunkNoise.length; x++) { 
    for(let y = 0; y < chunkNoise[x].length; y++) {
      const noise = chunkNoise[x][y]

      if(chunkBiomes[x][y] == "plains" || true) {
        if(noise < 0.6) {
          layersMapping[x][y] = 0
          types[x][y] = "grass1"
        }
        else if(noise < 0.85) {
          layersMapping[x][y] = 1
          types[x][y] = "grass2"
        }
        else {
          layersMapping[x][y] = 2
          types[x][y] = "grass3"
        }
      }
    }
  }

  return { types, layersMapping}
}
