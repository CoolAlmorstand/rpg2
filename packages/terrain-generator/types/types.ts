



export type IBiomeTypes = 
  "plains" | "forest" | "ocean" |
  "snow" | "desert" | "mountain" |
  "valye"


export type ILayer<T> = {
  noiseMap: number[][]
  types: T[][]
}


export type ITerrainMap = Record<string, ILayer<IBiomeTypes>>
