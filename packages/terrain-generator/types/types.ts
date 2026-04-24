
export type IBlendingEdges = {
    n: number | null,
    s: number | null,
    e: number | null,
    w: number | null,

    ne: number | null,
    nw: number | null,

    sw: number | null,
    se: number | null
}


export type IBiomeTypes = 
  "plains" | "forest" | "ocean" |
  "snow" | "desert" | "mountain" |
  "valye"


export type ILayer<T> = {
  noiseMap: number[][]
  types: T[][]
}


export type ITerrainMap = Record<string, ILayer<IBiomeTypes>>
