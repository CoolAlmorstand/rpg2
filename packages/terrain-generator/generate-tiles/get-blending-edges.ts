import type { IBlendingEdges, IGroundTiles } from "../types/types.ts"

// get the adjecent tiles to if its a diffetnet layer
// make sure its a square 
export function getBlendingEdges(chunkNoise: number[][], tileTypes: IGroundTiles[][], layersMapping: number[][], variants: number[][]): IBlendingEdges[][] {
  const blendingEdges: IBlendingEdges[][] = Array.from(layersMapping, (tileLayerCols) => 
    Array.from(tileLayerCols, () => {
      return {
        n: null, s: null, e: null, w: null,
        ne: null, nw: null, sw: null, se: null   
      }
    })
  )

  const chunkSize = blendingEdges.length
  
  //get horizontal e and w parings
  for(let y = 0; y < chunkSize; y++) {
    for(let x = 0; x < chunkSize - 1; x++) {
      //if tile types are different the tile with the higer noise value is considered to be the one above
      if(tileTypes[x][y] != tileTypes[x + 1][y]) {
        if(chunkNoise[x][y] < chunkNoise[x + 1][y]) {
          blendingEdges[x][y].e = {
            tileType: tileTypes[x + 1][y],
            variant: variants[x + 1][y],
            layer: layersMapping[x + 1][y]
          }
        }
        else {
          blendingEdges[x + 1][y].w = {
            tileType: tileTypes[x][y],
            variant: variants[x][y],
            layer: layersMapping[x][y]
          } 
        }
      }
      //if tiles are the same compare the layers
      else {
        if(layersMapping[x][y] < layersMapping[x + 1][y]) {
          blendingEdges[x][y].e = {
            tileType: tileTypes[x + 1][y],
            variant: variants[x + 1][y],
            layer: layersMapping[x + 1][y]
          } 
        }
        else if(layersMapping[x + 1][y] < layersMapping[x][y]) {
          blendingEdges[x + 1][y].w = {
            tileType: tileTypes[x][y],
            variant: variants[x][y],
            layer: layersMapping[x][y]
          } 
        }
      } 
    }
  }

  //get vertical s and w parings
  for(let x = 0; x < chunkSize; x++) {
    for(let y = 0; y < chunkSize - 1; y++) {
      //if tile types are different the tile with the higer noise value is considered to be the one above
      if(tileTypes[x][y] != tileTypes[x][y + 1]) {
        if(chunkNoise[x][y] < chunkNoise[x][y + 1]) {
          blendingEdges[x][y].s = {
            tileType: tileTypes[x][y + 1],
            variant: variants[x][y + 1],
            layer: layersMapping[x][y + 1]
          } 
        }
        else {
          blendingEdges[x][y + 1].n = {
            tileType: tileTypes[x][y],
            variant: variants[x][y],
            layer: layersMapping[x][y]
          } 
        }
      }
      //if tiles are the same compare the layers
      else {
        if(layersMapping[x][y] < layersMapping[x][y + 1]) {
          blendingEdges[x][y].s = {
            tileType: tileTypes[x][y + 1],
            variant: variants[x][y + 1],
            layer: layersMapping[x][y + 1]
          } 
        }
        else if(layersMapping[x][y + 1] < layersMapping[x][y]) {
          blendingEdges[x][y + 1].n = {
            tileType: tileTypes[x][y],
            variant: variants[x][y],
            layer: layersMapping[x][y]
          } 
        }
      }
    }
  }

  // gwt nw se parings 
  for(let xOffset = 0; xOffset < chunkSize - 1; xOffset++) {
    for(let step = 0; step < chunkSize - xOffset - 1; step++) {
      const tile1X = xOffset + step 
      const tile1Y = step 

      const tile2X = xOffset + step + 1
      const tile2Y = step + 1

      //if tile types are different the tile with the higer noise value is considered to be the one above
      if(tileTypes[tile1X][tile1Y] != tileTypes[tile2X][tile2Y]) {
        if(chunkNoise[tile1X][tile1Y] < chunkNoise[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].se = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else {
          blendingEdges[tile2X][tile2Y].nw = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
      //if tiles are the same compare the layers
      else {
        if(layersMapping[tile1X][tile1Y] < layersMapping[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].se = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else if(layersMapping[tile2X][tile2Y] < layersMapping[tile1X][tile1Y]) {
          blendingEdges[tile2X][tile2Y].nw = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
    }
  }

  for(let yOffset = 0; yOffset < chunkSize - 1; yOffset++) {
    for(let step = 0; step < chunkSize - yOffset - 1 ; step++) {
      const tile1X = step 
      const tile1Y = yOffset + step 

      const tile2X = step + 1
      const tile2Y = yOffset + step + 1

      if(tileTypes[tile1X][tile1Y] != tileTypes[tile2X][tile2Y]) {
        if(chunkNoise[tile1X][tile1Y] < chunkNoise[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].se = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else {
          blendingEdges[tile2X][tile2Y].nw = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
      //if tiles are the same compare the layers
      else {
        if(layersMapping[tile1X][tile1Y] < layersMapping[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].se = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else if(layersMapping[tile2X][tile2Y] < layersMapping[tile1X][tile1Y]) {
          blendingEdges[tile2X][tile2Y].nw = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
    }
  }

  //get ne and sw parings
  for(let xOffset = chunkSize - 1; xOffset > 0; xOffset--) {
    for(let step = 0; step < xOffset - 1; step++) {
      const tile1X = xOffset - step 
      const tile1Y = step 

      const tile2X = xOffset - step - 1
      const tile2Y = step + 1

      if(tileTypes[tile1X][tile1Y] != tileTypes[tile2X][tile2Y]) {
        if(chunkNoise[tile1X][tile1Y] < chunkNoise[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].sw = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else {
          blendingEdges[tile2X][tile2Y].ne = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
      //if tiles are the same compare the layers
      else {
        if(layersMapping[tile1X][tile1Y] < layersMapping[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].sw = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else if(layersMapping[tile2X][tile2Y] < layersMapping[tile1X][tile1Y]) {
          blendingEdges[tile2X][tile2Y].ne = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
    }
  }

  for(let yOffset = chunkSize - 1; yOffset > 0; yOffset--) {
    for(let step = 0; step < yOffset - 1; step++) {
      const tile1X = step 
      const tile1Y = yOffset - step 

      const tile2X = step + 1
      const tile2Y = yOffset - step - 1
      
      if(tileTypes[tile1X][tile1Y] != tileTypes[tile2X][tile2Y]) {
        if(chunkNoise[tile1X][tile1Y] < chunkNoise[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].ne = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else {
          blendingEdges[tile2X][tile2Y].sw = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
      //if tiles are the same compare the layers
      else {
        if(layersMapping[tile1X][tile1Y] < layersMapping[tile2X][tile2Y]) {
          blendingEdges[tile1X][tile1Y].ne = {
            tileType: tileTypes[tile2X][tile2Y],
            variant: variants[tile2X][tile2Y],
            layer: layersMapping[tile2X][tile2Y]
          } 
        }
        else if(layersMapping[tile2X][tile2Y] < layersMapping[tile1X][tile1Y]) {
          blendingEdges[tile2X][tile2Y].sw = {
            tileType: tileTypes[tile1X][tile1Y],
            variant: variants[tile1X][tile1Y],
            layer: layersMapping[tile1X][tile1Y]
          } 
        }
      }
    }
  }
  return blendingEdges 
}
