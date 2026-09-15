


export type ITerrainTypes = "grass" | "sand" | "water"

export type IMap = Record<string, {noiseMap: number[][], types: string[][]}>

export interface IRenderer {
  init(container: HTMLDivElement): Promise<void>
  startRenderLoop(fps: number): void;
  renderMap(): Promise<void> 
}


