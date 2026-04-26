import type { IGroundTiles, IBiomeTypes, IChunkTerrain, IBlendingEdges } from "./types/types";
import { generateChunkBiome } from "./generate-biomes/generate-biomes.ts"
import { generateTilesOfChunk } from "./generate-tiles/generate-tiles.ts";


export type { IBiomeTypes }
export type { IBlendingEdges }
export type { IGroundTiles }

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
    // -1 to get blending edges of edge of chunk
    const startingTileX = (chunkX * this.chunkSize) - 1
    const startingTileY = (chunkY * this.chunkSize) - 1

    // +2 to get blending edges of edge of chunk
    const biomes = generateChunkBiome(this.seed, startingTileX, startingTileY, this.chunkSize + 2)
    const groundTiles = generateTilesOfChunk(this.seed, startingTileX, startingTileY, this.chunkSize + 2, biomes.types)

    // Slice off the padding border, keeping only indices [1..chunkSize]
    const sliceGrid = <T>(grid: T[][]): T[][] =>
      grid.slice(1, this.chunkSize + 1).map(row => row.slice(1, this.chunkSize + 1))

    return {
      biomes: {
        ...biomes,
        noiseMap: sliceGrid(biomes.noiseMap), 
        types: sliceGrid(biomes.types),
      },
      groundTiles: {
        ...groundTiles,
        noiseMap:      sliceGrid(groundTiles.noiseMap),
        layersMapping: sliceGrid(groundTiles.layersMapping),
        blendingEdges: sliceGrid(groundTiles.blendingEdges),
        varaints:      sliceGrid(groundTiles.varaints),
        tileTypes:     sliceGrid(groundTiles.tileTypes),
      }
    } 
  } 
}
