
import * as PIXI from "pixi.js"
import type { IGroundTilesTypes } from "@terabithia/terrain-generator"

export type ITilesetConfiguration = 
  "left" | "right" | "top" | "bottom" |
  "topLeftCorner" | "topRightCorner" | 
  "bottomLeftCorner" | "bottomRightCorner" |
  "topLeftEmpty" | "topRightEmpty" | 
  "bottomLeftEmpty" | "bottomRightEmpty" |
  "center" | "daigonalConnectionLeft" | 
  "daigonalConnectionRight"



export type IGroundTilesetsTextureMap = Record<
  IGroundTilesTypes, Record<
    ITilesetConfiguration, Record<number, PIXI.Texture>
  >
>



