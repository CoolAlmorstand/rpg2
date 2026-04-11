import { IDBManager } from "../interfaces/IDBManager"
import type { IRoomCreateRoomData, IRoomCreateNewRoomResult, IRoomGetRoomsOfUserResult, IRoomManager, IRoomJoinRoomResult, IRoomJoinActiveRoomResult, IRoomStartRoomSessionResult, IRoomSendChatResult, IRoomSessionChats } from "../interfaces/room-manager/IRoomManeger"
import type { IActiveRoom } from "../interfaces/room-manager/IActiveRoom"

export class GameRoomManager implements IRoomManager {
  dbManager: IDBManager
  //key is room id
  activeRooms: Record<string, IActiveRoom> = {}
  //a quick cache of what active room a user is on
  //key is userId val is roomId
  activeRoomOfUsers: Record<string, string> = {}

  constructor(dbManager: IDBManager) {
    this.dbManager = dbManager
  }
  
  getSessionChatsOfRoom(roomId: string): IRoomSessionChats {
    const chats = this.activeRooms[roomId].sessionChats
    if(!chats) {
      []
    }
    return chats 
  }

  checkIfRoomExist(roomId: string ): boolean {
    if(this.activeRooms[roomId]){
      return true
    } else {
      return false
    }
  }
  
  getActiveRoomOFUser(userId: string): string | null { 
    return this.activeRoomOfUsers[userId] 
  }

  async sendChatToRoom(roomId: string, message: string, sender: { username: string; id: string }): Promise<IRoomSendChatResult> {
    if(!this.activeRooms[roomId] || !this.activeRooms[roomId].memberUsers[sender.id]) {
      return {
        success: false,
        error: {reason: "room does not exist or user is not a member of said room"}
      }
    }

    this.activeRooms[roomId].sessionChats.push({
      sender,
      indexOrder: this.activeRooms[roomId].sessionChats.length  - 1,
      message,
    }) 

    return {
      success: true,
      indexOrder: this.activeRooms[roomId].sessionChats.length  - 1
    }
  }

  kickPlayerFromActiveRoom(userId: string, roomId: string) {
    delete this.activeRoomOfUsers[userId]
    delete this.activeRooms[roomId].connectedUsers[userId]
  }

  findRoom(roomId: string) {
    return this.activeRooms[roomId]
  }
 
  async joinActiveRoom(userId: string, username: string, roomId: string): Promise<IRoomJoinActiveRoomResult> {
    if(!this.activeRooms[roomId]) {
      return {
        success: false,
        error: {reason: `active room session of room: ${roomId} doesnt exist`}
      } 
    }
    if(this.activeRoomOfUsers[userId]) {
      return {
        success: false,
        error: {reason: "user is currently a member of another room"}
      }
    }
    if(!this.activeRooms[roomId].memberUsers[userId]) {
      return {
        success: false, 
        error: {reason: "user is not a member of room"}
      }
    }
    this.activeRooms[roomId].connectedUsers[ userId] = {username, id: userId }
    this.activeRoomOfUsers[userId] = roomId
    return {
      success: true,
      activePlayers: Object.values(this.activeRooms[roomId].connectedUsers)
    }
  }
  
  async startRoomSession(roomId: string): Promise<IRoomStartRoomSessionResult> {
    const getRoomResult = await this.dbManager.getRoomFromId(roomId)

    if(!getRoomResult.success) {
      return { success: false, error: getRoomResult.error }
    }

    const getRoomMembersResult = await this.dbManager.getMembersOfRoom(roomId)
    
    if(!getRoomMembersResult.success) {
      return { success: false, error: getRoomMembersResult.error }
    }

    const activeRoom: IActiveRoom = {
      connectedUsers: {},
      roomName: getRoomResult.room.name,
      ownerUsername: getRoomResult.room.owner_name,
      ownerId: getRoomResult.room.owner_id,
      id: getRoomResult.room.id,
      sessionChats: [],
      memberUsers: getRoomMembersResult.members
    }
    //prevent duplication incase room is created multiple times at once 
    if(!this.activeRooms[roomId]) {
      this.activeRooms[roomId] = activeRoom
    } 

    return {
      success: true,
      activeRoom: this.activeRooms[roomId],
    }
  }

  async joinRoom(userId: string, username: string, roomId: string): Promise<IRoomJoinRoomResult> {
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

    if(this.activeRooms[roomId]) {
      this.activeRooms[roomId].memberUsers[userId] = {username, id: userId }
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
