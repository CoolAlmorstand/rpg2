
import * as PIXI from "pixi.js"

export interface IMapRenderer {
  container: PIXI.Container
  chunkSize: number

  drawChunk(x: number, y: number): Promise<void>
  drawMap(): void;
  moveAndZoomMap(x: number, y: number, zoom: number): void
}
