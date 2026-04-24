
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

export type IPlainsGroundTiles = 
  "grass1" | "grass2" | "grass3"

export type IGroundTiles = IPlainsGroundTiles

export type ILayer<T> = {
  noiseMap: number[][]
  types: T[][]
}


export type IChunkBiome = {
  noiseMap: number[][];
  types: IBiomeTypes[][];
}


export type IChunkGroundTiles = {
  noiseMap: number[][];
  //the layer of this tile 
  layersMapping: number[][];
  blendingEdges: IBlendingEdges[][]; 
  tileTypes: IPlainsGroundTiles[][]; 
}


export type IChunkTerrain = {
  biomes: IChunkBiome
  groundTiles: IChunkGroundTiles
}

export type ITerrainMap = Record<string, ILayer<IBiomeTypes>>
