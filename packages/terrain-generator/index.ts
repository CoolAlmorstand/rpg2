

import { createNoise2D } from "simplex-noise"
import alea from "alea"

type IMapTile = {
  type: "grass" | "water" | "sand" 
}
type IMap = IMapTile[][] 

function getTerrainTypeOfNoise(noise: number): "grass" | "water" | "sand" {
  if(noise < 0.45) {
    return "water"
  }
  else if(noise < 0.55) {
    return "sand"
  }
  else {
    return "grass"
  }
}


function createNoiseMap(height: number, width: number, seed: string, octaves: number, lacunarity: number, persistence: number, scale: number): number[][] { 
  const createNoise = createNoise2D(alea(seed))
  const noiseMap: number[][] = Array.from({length: width}, () => [] )

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let value = 0;
      let amplitude = 1;
      let frequency = 1;
      let max = 0;
      for (let i = 0; i < octaves; i++) {
        value += createNoise(x * frequency * scale, y * frequency * scale) * amplitude;
        max += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
      }
      noiseMap[x][y] = ( ( value / max ) + 1 ) / 2
    }
  }
  return noiseMap 
}


export function createMap(seed:string, height: number, width: number) {
  const noiseMap: number[][] = createNoiseMap(height, width, seed, 5, 2, 0.5, 0.05) 
  const map: IMap = Array.from({length: width}, () => [])
  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      map[x][y] = {
        type: getTerrainTypeOfNoise(noiseMap[x][y])
      }
    }
  }
  return map
}
