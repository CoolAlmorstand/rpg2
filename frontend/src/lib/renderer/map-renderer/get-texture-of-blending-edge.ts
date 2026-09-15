import * as PIXI from "pixi.js"

import type { IBlendingEdges, IGroundTilesTypes } from "@terabithia/terrain-generator"
import type { IGroundTilesetsTextureMap } from "$lib/interfaces/ITilesetLoader"


export function getBlendingEdgeTexture(type: IGroundTilesTypes, blendingEdge: IBlendingEdges, textureMap: IGroundTilesetsTextureMap ): PIXI.Texture | null {

  if (blendingEdge.n && blendingEdge.e) {
    const edgeTileType = blendingEdge.n.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.neEdge
    }
  }

  if (blendingEdge.n && blendingEdge.w) {
    const edgeTileType = blendingEdge.n.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.nwEdge
    }
  }

  if (blendingEdge.s && blendingEdge.e) {
    const edge1TileType = blendingEdge.s.tileType  
    const edge2TileType = blendingEdge.e.tileType  

    if (tileIndexValue[type] < tileIndexValue[edge1TileType] && edge1TileType == edge2TileType) {
      return textureMap[edge1TileType].blendingEdges.seEdge
    }
  }

  if (blendingEdge.s && blendingEdge.w) {
    const edgeTileType = blendingEdge.s.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.swEdge
    }
  }

  if (blendingEdge.n) {
    const edgeTileType = blendingEdge.n.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.n
    }
  }

  if (blendingEdge.s) {
    const edgeTileType = blendingEdge.s.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.s
    }
  }

  if (blendingEdge.e) {
    const edgeTileType = blendingEdge.e.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.e
    }
  }

  if (blendingEdge.w) {
    const edgeTileType = blendingEdge.w.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.w
    }
  }

  if (blendingEdge.ne) {
    const edgeTileType = blendingEdge.ne.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.neCorner
    }
  }

  if (blendingEdge.nw) {
    const edgeTileType = blendingEdge.nw.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.nwCorner
    }
  }

  if (blendingEdge.se) {
    const edgeTileType = blendingEdge.se.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.seCorner
    }
  }

  if (blendingEdge.sw) {
    const edgeTileType = blendingEdge.sw.tileType  
    if (tileIndexValue[type] < tileIndexValue[edgeTileType]) {
      return textureMap[edgeTileType].blendingEdges.swCorner
    }
  }
  return null
}
