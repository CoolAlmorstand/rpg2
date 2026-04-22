import FastNoiseLite from "fastnoise-lite";

function hashSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0
  }
  return hash
}

export function createCellularNoiseMap(seed: string, startX: number, startY: number, height: number, width: number, frequency: number, jitter: number): number[][] {
  const noise = new FastNoiseLite(hashSeed(seed));
  const noiseMap: number[][] = Array.from({length: width}, () => [])

  noise.SetNoiseType(FastNoiseLite.NoiseType.Cellular);
  noise.SetCellularReturnType(FastNoiseLite.CellularReturnType.CellValue);
  noise.SetFrequency(frequency)
  noise.SetCellularJitter(jitter)

  noise.SetCellularDistanceFunction(
    FastNoiseLite.CellularDistanceFunction.Hybrid
  )
 
  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) { 
      const value = ( noise.GetNoise(x + startX, y + startY) + 1 ) / 2
      noiseMap[x][y] = value
    }
  }

  return noiseMap
}
