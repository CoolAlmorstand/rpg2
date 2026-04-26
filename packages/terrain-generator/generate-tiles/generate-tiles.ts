import type { IBiomeTypes, IChunkGroundTiles } from "../types/types.ts"

import { generateSimplexNoiseOfChunk } from "../utils/generate-simplex-noise/generate-simplex-noise.ts"
import { getBlendingEdges } from "./get-blending-edges.ts"
import { getLayersMappingOfChunk } from "./get-layers-mapping-of-chunk.ts"
import { getTileTypesOfChunk } from "./get-tile-types-of-chunk.ts"
import { getTileVaraintsOfChunk } from "./get-tile-variants-of-chunk.ts"


export function generateTilesOfChunk(seed: string, startingTileX: number, startingTileY: number, chunkSize: number, chunkBiomes: IBiomeTypes[][]): IChunkGroundTiles {
  const noise = generateSimplexNoiseOfChunk(seed, startingTileX, startingTileY, chunkSize, 3, 2, 0.001, 1, 0.08, 0.5 )
  const types = getTileTypesOfChunk(noise, chunkBiomes)
  const layersMapping = getLayersMappingOfChunk(noise, types)  
  const varaints = getTileVaraintsOfChunk(noise, types)  
  const blendingEdges = getBlendingEdges(noise, types, layersMapping,  varaints)
  return {
    noiseMap: noise,
    tileTypes: types,
    layersMapping,
    varaints,
    blendingEdges
  }
}








