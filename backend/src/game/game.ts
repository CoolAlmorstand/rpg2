
import type { ICreateGameData } from "@terabithia/shared-types"
import type { IGame } from "../interfaces/IGame.ts"

export class Game implements IGame {
  maxPlayers: number;
  map?
  constructor(gameData: ICreateGameData ) {
    
  }
}
