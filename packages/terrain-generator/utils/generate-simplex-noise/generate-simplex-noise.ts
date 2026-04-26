import { createNoise2D } from "simplex-noise"
import alea from "alea"

type params = {
  seed: string;
  height: number;
  width: number;
  octaves: number;
  lacunarity: number;
  persistence: number;
  scale: number;
  amplitude: number;
  frequency: number;

}


export function generateSimplexNoiseOfChunk(seed: string, startingTileX: number, startingTileY: number, chunkSize: number, octaves: number, lacunarity: number, persistence: number, amplitude: number, frequency: number, scale: number,) {
  const createNoise = createNoise2D(alea(seed))
  const noiseMap: number[][] = Array.from({length: chunkSize}, () => [] )

  for(let x = 0; x < chunkSize; x++) {
    for(let y = 0; y < chunkSize; y++) {
      let value = 0; 
      let max = 0;
      let amp = amplitude 
      let freq = frequency
      const globaxX = startingTileX + x
      const globaxY = startingTileY + y
      for (let i = 0; i < octaves; i++) {
        value += createNoise(globaxX * freq * scale, globaxY * freq * scale) * amp;
        max += amp;
        amp *= persistence;
        freq *= lacunarity;
      }
      noiseMap[x][y] = ( ( value / max ) + 1 ) / 2
    }
  }

  return noiseMap
}

export function createSimplexNoiseMap({seed, height, width, octaves, lacunarity, persistence, scale, amplitude = 1, frequency = 1 }: params): number[][] { 
  const createNoise = createNoise2D(alea(seed))
  const noiseMap: number[][] = Array.from({length: width}, () => [] )

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let value = 0; 
      let max = 0;
      for (let i = 0; i < octaves; i++) {
        value += createNoise(x * frequency * scale, y * frequency * scale) * amplitude;
        max += amplitude;
        amplitude *= persistence;
        frequency *= lacunarity;
      }
      noiseMap[x][y] = ( ( value / max ) + 1 ) / 2
    }
  }
  return noiseMap 
}

