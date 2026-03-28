import type { IGame } from "../interfaces/IGame"  
import type { IRoomManager } from "../interfaces/IRoomManeger"
import type { ICreateGameData } from "@terabithia/shared-types"

export class GameRoomManager implements IRoomManager {
  rooms: Record<string, IGame> = {}
  constructor() {

  }
  
  checkIfRoomExist(roomId: string ): boolean {
    if(this.rooms[roomId]){
      return true
    } else {
      return false
    }
  }

  findRoom(roomId: string) {
    return this.rooms[roomId]
  }

  createNewRoom(gameData: ICreateGameData) {
  }
}
