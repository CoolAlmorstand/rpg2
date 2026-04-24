import { IBiomeTypes, IBlendingEdges } from "../types/types.ts"
import { generateSimplexNoiseOfChunk } from "../utils/generate-simplex-noise/generate-simplex-noise.ts"

function getTileLayerOfChunk(chunkNoise: number[][]): number[][] {
  const tileLayers: number[][] = Array.from(chunkNoise, () => [])
  for(let x = 0; x < chunkNoise.length; x++) {
    for(let y = 0; y < chunkNoise[x].length; y++) {
      const noise = chunkNoise[x][y]
      if(noise < 0.6) {
        tileLayers[x][y] = 0
      }
      else if(noise < 0.85) {
        tileLayers[x][y] = 1
      }
      else {
        tileLayers[x][y] = 2
      }
    }
  }
  return tileLayers
}


// get the adjecent tiles to if its a diffetnet layer
// make sure its a square 
function getBlendingEdges(tileLayers: number[][]): IBlendingEdges[][] {
  const blendingEdges: IBlendingEdges[][] = Array.from(tileLayers, (tileLayerCols) => 
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
      if(tileLayers[x][y] < tileLayers[x + 1][y]) {
        blendingEdges[x][y].e = tileLayers[x + 1][y]
      }
      else if(tileLayers[x + 1][y] < tileLayers[x][y]) {
        blendingEdges[x + 1][y].w = tileLayers[x][y]
      } 
    }
  }

  //get vertical s and w parings
  for(let x = 0; x < chunkSize; x++) {
    for(let y = 0; y < chunkSize - 1; y++) {
      if(tileLayers[x][y] < tileLayers[x][y + 1]) {
        blendingEdges[x][y].s = tileLayers[x][y + 1]
      }
      else if(tileLayers[x][y + 1] < tileLayers[x][y]) {
        blendingEdges[x][y + 1].n = tileLayers[x][y]
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

      if(tileLayers[tile1X][tile1Y] < tileLayers[tile2X][tile2Y]) {
        blendingEdges[tile1X][tile1Y].se = tileLayers[tile2X][tile2Y] 
      } 
      else if(tileLayers[tile2X][tile2Y] < tileLayers[tile1X][tile1Y]) {
        blendingEdges[tile2X][tile2Y].nw = tileLayers[tile1X][tile1Y] 
      }
    }
  }

  for(let yOffset = 0; yOffset < chunkSize - 1; yOffset++) {
    for(let step = 0; step < chunkSize - yOffset - 1 ; step++) {
      const tile1X = step 
      const tile1Y = yOffset + step 

      const tile2X = step + 1
      const tile2Y = yOffset + step + 1

      if(tileLayers[tile1X][tile1Y] < tileLayers[tile2X][tile2Y]) {
        blendingEdges[tile1X][tile1Y].se = tileLayers[tile2X][tile2Y] 
      } 
      else if(tileLayers[tile2X][tile2Y] < tileLayers[tile1X][tile1Y]) {
        blendingEdges[tile2X][tile2Y].nw = tileLayers[tile1X][tile1Y] 
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

      if(tileLayers[tile1X][tile1Y] < tileLayers[tile2X][tile2Y]) {
        blendingEdges[tile1X][tile1Y].sw = tileLayers[tile2X][tile2Y] 
      } 
      else if(tileLayers[tile2X][tile2Y] < tileLayers[tile1X][tile1Y]) {
        blendingEdges[tile2X][tile2Y].ne = tileLayers[tile1X][tile1Y] 
      }
    }
  }

  for(let yOffset = chunkSize - 1; yOffset > 0; yOffset--) {
    for(let step = 0; step < yOffset - 1; step++) {
      const tile1X = step 
      const tile1Y = yOffset - step 

      const tile2X = step + 1
      const tile2Y = yOffset + step + 1

      if(tileLayers[tile1X][tile1Y] < tileLayers[tile2X][tile2Y]) {
        blendingEdges[tile1X][tile1Y].ne = tileLayers[tile2X][tile2Y] 
      } 
      else if(tileLayers[tile2X][tile2Y] < tileLayers[tile1X][tile1Y]) {
        blendingEdges[tile2X][tile2Y].sw = tileLayers[tile1X][tile1Y] 
      }
    }
  }
  return blendingEdges 
}

export function generateTilesOfChunk(seed: string, chunkSize: number): {tileLayers: number[][], blendingEdges: IBlendingEdges[][]} {
  // add one so you know the blending edges of edge of chunk
  const noise = generateSimplexNoiseOfChunk(seed, chunkSize + 1, 1, 0.5, 0.01, 1, 0.5, 0.04)
  const tileLayers = getTileLayerOfChunk(noise)
  const blendingEdges = getBlendingEdges(tileLayers)

  return {
    tileLayers,
    blendingEdges
  }
}








