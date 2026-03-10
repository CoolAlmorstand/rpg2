
import type { InputSignal } from "./InputSignal"



export interface IGame {
  sendControlInput(inputSignal: InputSignal ): void;
}
