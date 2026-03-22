import type { IGame } from "../interfaces/IGame"  
import type { IRoomManager } from "../interfaces/IRoomManeger"

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

  createNewRoom() {
    const roomId = crypto.randomUUID().replace(/-/g, '').slice(0, 6);
    this.rooms[roomId] = {testRoom: "data sample"}
  }
}
