
import type { IGroundTilesetsTextureMap } from "$lib/interfaces/ITilesetLoader";

import * as PIXI from "pixi.js"
import grassTilesetImage from "$lib/assets/grass_tileset_16x16.png"

function splitSpriteSheet( baseTexture: PIXI.Texture, frameWidth: number, frameHeight: number ): PIXI.Texture[][] {
  const { width, height } = baseTexture;
  const cols = Math.floor(width / frameWidth);
  const rows = Math.floor(height / frameHeight);
  const frames: PIXI.Texture[][] = [];

  for (let x = 0; x < cols; x++) {
    frames[x] = [];
    for (let y = 0; y < rows; y++) {
      frames[x][y] = new PIXI.Texture({
        source: baseTexture.source,
        frame: new PIXI.Rectangle(x * frameWidth, y * frameHeight, frameWidth, frameHeight),
      });
    }
  }

  return frames;
}

export async function loadTilesets(): Promise<IGroundTilesetsTextureMap> {
  const loadedGrassTileset = await PIXI.Assets.load(grassTilesetImage)
  const splittedTileseTextures = splitSpriteSheet(loadedGrassTileset, 16, 16) 

  const textureMap: IGroundTilesetsTextureMap = {
    grass: {
      layers: {
        0: {
          variants: {
            0: splittedTileseTextures[0][0],
            1: splittedTileseTextures[0][1],
            2: splittedTileseTextures[0][2],
          },
          blendingEdges: {
            n: splittedTileseTextures[2][0],
            s: splittedTileseTextures[2][2],
            e: splittedTileseTextures[3][1],
            w: splittedTileseTextures[1][1],
            neCorner: splittedTileseTextures[4][1],
            nwCorner: splittedTileseTextures[5][1],
            seCorner: splittedTileseTextures[4][0],
            swCorner: splittedTileseTextures[5][0],
            neEdge: splittedTileseTextures[3][0],
            nwEdge: splittedTileseTextures[1][0],
            seEdge: splittedTileseTextures[3][2],
            swEdge: splittedTileseTextures[1][2],
          }
        },
        1: {
          variants: {
            0: splittedTileseTextures[0][3],
            1: splittedTileseTextures[0][4],
            2: splittedTileseTextures[0][5],
          },
          blendingEdges: {
            n: splittedTileseTextures[2][3],
            s: splittedTileseTextures[2][5],
            e: splittedTileseTextures[3][4],
            w: splittedTileseTextures[1][4],
            neCorner: splittedTileseTextures[4][4],
            nwCorner: splittedTileseTextures[5][4],
            seCorner: splittedTileseTextures[4][3],
            swCorner: splittedTileseTextures[5][3],
            neEdge: splittedTileseTextures[3][3],
            nwEdge: splittedTileseTextures[1][3],
            seEdge: splittedTileseTextures[3][5],
            swEdge: splittedTileseTextures[1][5],
          }
        },
        2: {
          variants: {
            0: splittedTileseTextures[0][6],
            1: splittedTileseTextures[0][7],
            2: splittedTileseTextures[0][8],
          },
          blendingEdges: {
            n: splittedTileseTextures[2][6],
            s: splittedTileseTextures[2][8],
            e: splittedTileseTextures[3][7],
            w: splittedTileseTextures[1][7],
            neCorner: splittedTileseTextures[4][7],
            nwCorner: splittedTileseTextures[5][7],
            seCorner: splittedTileseTextures[4][6],
            swCorner: splittedTileseTextures[5][6],
            neEdge: splittedTileseTextures[3][6],
            nwEdge: splittedTileseTextures[1][6],
            seEdge: splittedTileseTextures[3][8],
            swEdge: splittedTileseTextures[1][8],
          }
        },
      }
    }
  }

  return textureMap
}
