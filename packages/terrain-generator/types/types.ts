export type IBiomeTypes = 
  "plains" | "forest" | "ocean" |
  "snow" | "desert" | "mountain" |
  "valye"

export type IPlainsGroundTilesTypes = 
  "grass" | "grass-dark" | "grass-light" |
  "dirt"

export type IDesertGroundTilesTypes = 
  "sand" | "red-sand"

export type IGroundTilesTypes = 
  IPlainsGroundTilesTypes | IDesertGroundTilesTypes


export type IChunkBiome = {
  noiseMap: number[][];
  types: IBiomeTypes[][];
}


// each tileType is layer and could iether be tile or just null

export type IGroundTile = {
  variant: number,
} | null

export type IChunkGroundTiles = Record<IGroundTilesTypes, IGroundTile[][]>


export type IChunkTerrain = {
  biomes: IChunkBiome
  groundTiles: IChunkGroundTiles
}

