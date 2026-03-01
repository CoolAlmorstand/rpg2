

import type { Container } from "pixi.js"
import type { EventEmitter } from "pixi.js"


export interface IScreen {
  displayContainer: Container;
  on: EventEmitter;
  centerHorizontally(): void;
}
