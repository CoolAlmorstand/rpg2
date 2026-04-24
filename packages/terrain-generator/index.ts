import type { ILayer, IBiomeTypes, IChunkTerrain } from "./types/types";
import { generateChunkBiome } from "./generate-biomes/generate-biomes.ts"
import { generateTilesOfChunk } from "./generate-tiles/generate-tiles.ts";


export type { IBiomeTypes }



export interface ITerrainGenerator {
  generateChunk(chunkX: number, chunkY: number): IChunkTerrain 
}



export class TerrainGenerator implements ITerrainGenerator {
  seed: string;
  chunkSize: number
  constructor(seed: string, chunkSize: number) {
    this.seed = seed
    this.chunkSize = chunkSize
  }

  generateChunk(chunkX: number, chunkY: number): IChunkTerrain {
    const biomes = generateChunkBiome(this.seed, this.chunkSize, chunkX, chunkY) 
    const groundTiles = generateTilesOfChunk(this.seed, biomes.types, this.chunkSize)
    return {
      biomes,
      groundTiles 
    } 
  } 
}
