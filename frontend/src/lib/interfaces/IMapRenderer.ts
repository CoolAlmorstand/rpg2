
import * as PIXI from "pixi.js"

export interface IMapRenderer {
  container: PIXI.Container
  chunkSize: number

  drawChunk(x: number, y: number): Promise<void>
  drawMap(): void;
  moveMap(x: number, y: number): void
  zoomMap(zoom: number): void;
}
