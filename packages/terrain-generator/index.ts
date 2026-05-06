import type { IGroundTilesTypes, IBiomeTypes, IChunkTerrain, IChunkGroundTiles } from "./types/types";
import { generateChunkBiome } from "./generate-biomes/generate-biomes.ts"
import { generateTilesOfChunk } from "./generate-tiles/generate-tiles.ts";
import { TestTerrainGenerator } from "./test/test.ts"

export type { IBiomeTypes }
export type { IGroundTilesTypes }
export type { IChunkGroundTiles }

export {TestTerrainGenerator}

export interface ITerrainGenerator {
  generateChunk(chunkX: number, chunkY: number, includePadding: boolean): IChunkTerrain 
}



export class TerrainGenerator implements ITerrainGenerator {
  seed: string;
  chunkSize: number
  constructor(seed: string, chunkSize: number) {
    this.seed = seed
    this.chunkSize = chunkSize
  }

  generateChunk(chunkX: number, chunkY: number, includePadding: boolean): IChunkTerrain {
    if(includePadding) {
      // -1 to get blending edges of edge of chunk
      const startingTileX = Math.max(0, (chunkX * this.chunkSize) - 1 )
      const startingTileY = Math.max(0, (chunkY * this.chunkSize) - 1 )

      // +2 to get blending edges of edge of chunk
      const biomes = generateChunkBiome(this.seed, startingTileX, startingTileY, this.chunkSize + 2)
      const groundTiles = generateTilesOfChunk(this.seed, startingTileX, startingTileY, this.chunkSize + 2, biomes)

      return {
        biomes,
        groundTiles
      }
    }
    else {
      const startingTileX = chunkX * this.chunkSize
      const startingTileY = chunkY * this.chunkSize

      // +2 to get blending edges of edge of chunk
      const biomes = generateChunkBiome(this.seed, startingTileX, startingTileY, this.chunkSize)
      const groundTiles = generateTilesOfChunk(this.seed, startingTileX, startingTileY, this.chunkSize, biomes)

      return {
        biomes,
        groundTiles
      }
    }
  } 
}
