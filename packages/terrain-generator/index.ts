import type { ILayer, IBiomeTypes, ITerrainMap } from "./types/types";
import { generateChunkBiome } from "./generate-biomes/generate-biomes.ts"

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

  generateChunk(x: number, y: number): ITerrainMap {
    return {
      biomes: this.generateChunkBiome(x, y)
    } 
  }

  private generateChunkBiome(x: number, y: number): ILayer<IBiomeTypes> {
    return generateChunkBiome(this.seed, this.chunkSize, x, y) 
  }
}
