import { IBiomeTypes, IChunkGroundTiles } from "../types/types.ts"
import { generateSimplexNoiseOfChunk } from "../utils/generate-simplex-noise/generate-simplex-noise.ts"
import { getBlendingEdges } from "./get-blending-edges.ts"
import { getTileTypeAndLayerOfChunk } from "./get-tile-type-and-layer.ts"


export function generateTilesOfChunk(seed: string, chunkBiomes: IBiomeTypes[][], chunkSize: number): IChunkGroundTiles {
  const noise = generateSimplexNoiseOfChunk(seed, chunkSize, 2, 0.8, 0.001, 1, 0.7, 0.5)
  const { layersMapping, types } = getTileTypeAndLayerOfChunk(noise,chunkBiomes)
  const blendingEdges = getBlendingEdges(layersMapping)

  return {
    noiseMap: noise,
    tileTypes: types,
    layersMapping,
    blendingEdges
  }
}








