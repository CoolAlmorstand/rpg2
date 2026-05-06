
import type { IGroundTilesetsTextureMap } from "$lib/interfaces/ITilesetLoader";

import * as PIXI from "pixi.js"
import grassTilesetImage from "$lib/assets/grass-dual-grid.png"
import desertTilesetImage from "$lib/assets/desert.png"

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
  const loadedDesertTileset = await PIXI.Assets.load(desertTilesetImage)

  const splittedGrassTileseTextures = splitSpriteSheet(loadedGrassTileset, 16, 16) 
  const splittedSandTileseTextures = splitSpriteSheet(loadedDesertTileset, 16, 16) 
  
  const textureMap: IGroundTilesetsTextureMap = {
    "grass-light": {
      top: {
        0: splittedGrassTileseTextures[3][0]  
      },
      bottom: {
        0: splittedGrassTileseTextures[1][2]  
      },
      left: {
        0: splittedGrassTileseTextures[2][2]
      },
      right: {
        0: splittedGrassTileseTextures[1][0]
      },
      topRightCorner: {
        0: splittedGrassTileseTextures[0][0]
      },
      topLeftCorner: {
        0: splittedGrassTileseTextures[1][3]
      },
      bottomRightCorner: {
        0: splittedGrassTileseTextures[3][3]
      },
      bottomLeftCorner: {
        0: splittedGrassTileseTextures[0][2]
      },
      center: {
        0: splittedGrassTileseTextures[2][1]
      },
      topRightEmpty: {
        0: splittedGrassTileseTextures[2][0]
      },
      topLeftEmpty: {
        0: splittedGrassTileseTextures[1][1]
      },
      bottomRightEmpty: {
        0: splittedGrassTileseTextures[3][1]
      },
      bottomLeftEmpty: {
        0: splittedGrassTileseTextures[2][2]
      },
      daigonalConnectionLeft: {
        0: splittedGrassTileseTextures[0][1]
      },
      daigonalConnectionRight: {
        0: splittedGrassTileseTextures[2][3]
      }
    }, 
    "grass-dark": {
      top: {
        0: splittedGrassTileseTextures[3][0]  
      },
      bottom: {
        0: splittedGrassTileseTextures[1][2]  
      },
      left: {
        0: splittedGrassTileseTextures[2][2]
      },
      right: {
        0: splittedGrassTileseTextures[1][0]
      },
      topRightCorner: {
        0: splittedGrassTileseTextures[0][0]
      },
      topLeftCorner: {
        0: splittedGrassTileseTextures[1][3]
      },
      bottomRightCorner: {
        0: splittedGrassTileseTextures[3][3]
      },
      bottomLeftCorner: {
        0: splittedGrassTileseTextures[0][2]
      },
      center: {
        0: splittedGrassTileseTextures[2][1]
      },
      topRightEmpty: {
        0: splittedGrassTileseTextures[2][0]
      },
      topLeftEmpty: {
        0: splittedGrassTileseTextures[1][1]
      },
      bottomRightEmpty: {
        0: splittedGrassTileseTextures[3][1]
      },
      bottomLeftEmpty: {
        0: splittedGrassTileseTextures[2][2]
      },
      daigonalConnectionLeft: {
        0: splittedGrassTileseTextures[0][1]
      },
      daigonalConnectionRight: {
        0: splittedGrassTileseTextures[2][3]
      }
    },
    grass: {
      top: {
        0: splittedGrassTileseTextures[3][0]  
      },
      bottom: {
        0: splittedGrassTileseTextures[1][2]  
      },
      left: {
        0: splittedGrassTileseTextures[2][2]
      },
      right: {
        0: splittedGrassTileseTextures[1][0]
      },
      topRightCorner: {
        0: splittedGrassTileseTextures[0][0]
      },
      topLeftCorner: {
        0: splittedGrassTileseTextures[1][3]
      },
      bottomRightCorner: {
        0: splittedGrassTileseTextures[3][3]
      },
      bottomLeftCorner: {
        0: splittedGrassTileseTextures[0][2]
      },
      center: {
        0: splittedGrassTileseTextures[2][1]
      },
      topRightEmpty: {
        0: splittedGrassTileseTextures[2][0]
      },
      topLeftEmpty: {
        0: splittedGrassTileseTextures[1][1]
      },
      bottomRightEmpty: {
        0: splittedGrassTileseTextures[3][1]
      },
      bottomLeftEmpty: {
        0: splittedGrassTileseTextures[2][2]
      },
      daigonalConnectionLeft: {
        0: splittedGrassTileseTextures[0][1]
      },
      daigonalConnectionRight: {
        0: splittedGrassTileseTextures[2][3]
      }
    },
    sand: {
      top: {
        0: splittedGrassTileseTextures[3][0]  
      },
      bottom: {
        0: splittedGrassTileseTextures[1][2]  
      },
      left: {
        0: splittedGrassTileseTextures[2][2]
      },
      right: {
        0: splittedGrassTileseTextures[1][0]
      },
      topRightCorner: {
        0: splittedGrassTileseTextures[0][0]
      },
      topLeftCorner: {
        0: splittedGrassTileseTextures[1][3]
      },
      bottomRightCorner: {
        0: splittedGrassTileseTextures[3][3]
      },
      bottomLeftCorner: {
        0: splittedGrassTileseTextures[0][2]
      },
      center: {
        0: splittedGrassTileseTextures[2][1]
      },
      topRightEmpty: {
        0: splittedGrassTileseTextures[2][0]
      },
      topLeftEmpty: {
        0: splittedGrassTileseTextures[1][1]
      },
      bottomRightEmpty: {
        0: splittedGrassTileseTextures[3][1]
      },
      bottomLeftEmpty: {
        0: splittedGrassTileseTextures[2][2]
      },
      daigonalConnectionLeft: {
        0: splittedGrassTileseTextures[0][1]
      },
      daigonalConnectionRight: {
        0: splittedGrassTileseTextures[2][3]
      }
    },
    "red-sand": {
      top: {
        0: splittedGrassTileseTextures[3][0]  
      },
      bottom: {
        0: splittedGrassTileseTextures[1][2]  
      },
      left: {
        0: splittedGrassTileseTextures[2][2]
      },
      right: {
        0: splittedGrassTileseTextures[1][0]
      },
      topRightCorner: {
        0: splittedGrassTileseTextures[0][0]
      },
      topLeftCorner: {
        0: splittedGrassTileseTextures[1][3]
      },
      bottomRightCorner: {
        0: splittedGrassTileseTextures[3][3]
      },
      bottomLeftCorner: {
        0: splittedGrassTileseTextures[0][2]
      },
      center: {
        0: splittedGrassTileseTextures[2][1]
      },
      topRightEmpty: {
        0: splittedGrassTileseTextures[2][0]
      },
      topLeftEmpty: {
        0: splittedGrassTileseTextures[1][1]
      },
      bottomRightEmpty: {
        0: splittedGrassTileseTextures[3][1]
      },
      bottomLeftEmpty: {
        0: splittedGrassTileseTextures[2][2]
      },
      daigonalConnectionLeft: {
        0: splittedGrassTileseTextures[0][1]
      },
      daigonalConnectionRight: {
        0: splittedGrassTileseTextures[2][3]
      }
    }
  }

  return textureMap
}
