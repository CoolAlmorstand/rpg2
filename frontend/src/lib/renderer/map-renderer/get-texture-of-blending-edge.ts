import * as PIXI from "pixi.js"

import type { IBlendingEdges, IGroundTiles } from "@terabithia/terrain-generator"
import type { IGroundTilesetsTextureMap } from "$lib/interfaces/ITilesetLoader"


export function getBlendingEdgeTexture(blendingEdge: IBlendingEdges, textureMap: IGroundTilesetsTextureMap): PIXI.Texture | null {

  if (blendingEdge.n && blendingEdge.w) {
    const layer = blendingEdge.n.layer
    const tileType = blendingEdge.n.tileType
    return textureMap[tileType].layers[layer].blendingEdges.nwEdge
  }
  else if (blendingEdge.n && blendingEdge.e) {
    const layer = blendingEdge.n.layer
    const tileType = blendingEdge.n.tileType
    return textureMap[tileType].layers[layer].blendingEdges.neEdge
  }
  else if (blendingEdge.s && blendingEdge.e) {
    const layer = blendingEdge.s.layer
    const tileType = blendingEdge.s.tileType
    return textureMap[tileType].layers[layer].blendingEdges.seEdge
  }
  else if (blendingEdge.s && blendingEdge.w) {
    const layer = blendingEdge.s.layer
    const tileType = blendingEdge.s.tileType
    return textureMap[tileType].layers[layer].blendingEdges.swEdge
  }
  else if (blendingEdge.n) {
    const layer = blendingEdge.n.layer
    const tileType = blendingEdge.n.tileType
    return textureMap[tileType].layers[layer].blendingEdges.n
  }
  else if (blendingEdge.s) {
    const layer = blendingEdge.s.layer
    const tileType = blendingEdge.s.tileType
    return textureMap[tileType].layers[layer].blendingEdges.s
  }
  else if (blendingEdge.e) {
    const layer = blendingEdge.e.layer
    const tileType = blendingEdge.e.tileType
    return textureMap[tileType].layers[layer].blendingEdges.e
  }
  else if (blendingEdge.w) {
    const layer = blendingEdge.w.layer
    const tileType = blendingEdge.w.tileType
    return textureMap[tileType].layers[layer].blendingEdges.w
  }
  else if (blendingEdge.ne) {
    const layer = blendingEdge.ne.layer
    const tileType = blendingEdge.ne.tileType
    return textureMap[tileType].layers[layer].blendingEdges.neCorner
  }
  else if (blendingEdge.nw) {
    const layer = blendingEdge.nw.layer
    const tileType = blendingEdge.nw.tileType
    return textureMap[tileType].layers[layer].blendingEdges.nwCorner
  }
  else if (blendingEdge.se) {
    const layer = blendingEdge.se.layer
    const tileType = blendingEdge.se.tileType
    return textureMap[tileType].layers[layer].blendingEdges.seCorner
  }
  else if (blendingEdge.sw) {
    const layer = blendingEdge.sw.layer
    const tileType = blendingEdge.sw.tileType
    return textureMap[tileType].layers[layer].blendingEdges.swCorner
  } 

  return null
}

