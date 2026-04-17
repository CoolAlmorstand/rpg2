

import { createNoise2D } from "simplex-noise"
import alea from "alea"

type IMapTile = {
  type: "grass" | "water" | "sand" 
}
type IMap = IMapTile[][] 

function getTerrainTypeOfNoise(noise: number): "grass" | "water" | "sand" {
  if(noise < 0.6) {
    return "water"
  }
  else if(noise < 0.9) {
    return "grass"
  }
  else {
    return "sand"
  }
}
export function createMap(seed:string, height: number, width: number) {
  const createNoise = createNoise2D(alea(seed))
  const noiseMap: number[][] = Array.from({length: height}, () => [])
  const map: IMap = Array.from({length: height}, () => [])
  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      const noise = createNoise(x, y)  
      map[x][y] = {
        type: getTerrainTypeOfNoise(noise)
      }
      noiseMap[x][y] = noise 
    }
  }

  return map
}
