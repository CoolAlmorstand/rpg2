
import * as PIXI from "pixi.js"
export type IBlendingEdgesTextureMap = {
  n: PIXI.Texture,
  s: PIXI.Texture,
  e: PIXI.Texture,
  w: PIXI.Texture,

  neCorner: PIXI.Texture,
  nwCorner: PIXI.Texture,
  swCorner: PIXI.Texture,
  seCorner: PIXI.Texture,

  neEdge: PIXI.Texture,
  nwEdge: PIXI.Texture,
  swEdge: PIXI.Texture,
  seEdge: PIXI.Texture
}

export type IGroundTilesetsTextureMap = {
  grass: {
    layers: {
      [key: number]: {
        variants: Record<number, PIXI.Texture>,
        blendingEdges: IBlendingEdgesTextureMap,
      }
    }
  }
}



