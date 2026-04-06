import { IDBManager } from "../interfaces/IDBManager"
import type { IGame } from "../interfaces/IGame"  
import type { IRoomCreateRoomData, IRoomCreateNewRoomResult, IRoomGetRoomsOfUserResult, IRoomManager, IRoomJoinRoomResult } from "../interfaces/IRoomManeger"
import type { IROOMCreateRoomData } from "@terabithia/shared-types"

export class GameRoomManager implements IRoomManager {
  dbManager: IDBManager
  rooms: Record<string, IGame> = {}
  constructor(dbManager: IDBManager) {
    this.dbManager = dbManager
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
  
  async joinRoom(userId: any, roomId: any): Promise<IRoomJoinRoomResult> {
    const joinUserResult = await this.dbManager.joinUserToRoom(userId, roomId)
    
    if(!joinUserResult.success) {
      return {
        success: false,
        error: joinUserResult.error 
      }
    }
    
    const getRoomInfo = await this.dbManager.getRoomFromId(roomId)
    if(!getRoomInfo.success) {
      return {
        success: false,
        error: getRoomInfo.error
      }
    }

    return {
      success: true,
      ownerUsername: getRoomInfo.room.owner_name,
      roomName: getRoomInfo.room.name
    } 
  }

  async getRoomsOfUser(userId: string): Promise<IRoomGetRoomsOfUserResult> {
    const getRoomsResult = await this.dbManager.getRoomsOfUser(userId)
    
    if(!getRoomsResult.success) {
      return {
        success: false,
        error: getRoomsResult.error
      }
    }

    return {
      success: true,
      rooms: getRoomsResult.rooms.map(room => {
        return {
          name: room.name,
          roomId: room.id,
          ownerUsername: room.owner_name
        }
      })
    } 
  }
  
  async createNewRoom(roomData: IRoomCreateRoomData): Promise<IRoomCreateNewRoomResult> {
    const createRoomResult = await this.dbManager.createNewRoom(roomData)
    
    if(!createRoomResult.success) {
      return {
        success: false,
        error: createRoomResult.error
      } 
    }
    const joinResult = await this.dbManager.joinUserToRoom(roomData.ownerId, createRoomResult.roomId)

    if(joinResult.success) {
      return {
        success: true,
        roomId: createRoomResult.roomId
      }
    }
    
    return {
      success: false,
      error: {reason: "failed to join user to room"}
    }
  } 
}
