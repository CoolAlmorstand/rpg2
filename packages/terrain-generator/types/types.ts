
export type IBlendingEdges = {
  n: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null,

  s: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null,

  e: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null,

  w: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null,

  ne: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null,

  nw: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null,

  sw: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null,

  se: {
    tileType: IGroundTiles,
    variant: number,
    layer: number
  } | null
}

export type IBiomeTypes = 
  "plains" | "forest" | "ocean" |
  "snow" | "desert" | "mountain" |
  "valye"

export type IPlainsGroundTiles = "grass" 

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
  varaints: number[][]
  tileTypes: IPlainsGroundTiles[][]; 
}


export type IChunkTerrain = {
  biomes: IChunkBiome
  groundTiles: IChunkGroundTiles
}

export type ITerrainMap = Record<string, ILayer<IBiomeTypes>>
