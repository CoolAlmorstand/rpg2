import type { ILayer, IBiomeTypes, ITerrainMap } from "./types/types";
import { generateChunkBiome } from "./generate-biomes/generate-biomes.ts"



export type { IBiomeTypes }



export interface ITerrainGenerator {
  generateChunk(x: number, y: number): ITerrainMap
}



export class TerrainGenerator implements ITerrainGenerator {
  seed: string;
  chunkSize: number
  constructor(seed: string, chunkSize: number) {
    this.seed = seed
    this.chunkSize = chunkSize
  }

  generateChunk(chunkX: number, chunkY: number): ITerrainMap {
    const biomes = this.generateChunkBiome(chunkX, chunkY) 
    return {
      biomes,
    } 
  }

  private generateChunkBiome(x: number, y: number): ILayer<IBiomeTypes> {
    return generateChunkBiome(this.seed, this.chunkSize, x, y) 
  }
}
