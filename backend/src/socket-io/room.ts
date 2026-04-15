import type { Namespace, DisconnectReason } from "socket.io"
import type { IRoomSocket, IRoomSocketGetActivePlayersOfRoomResponse, IRoomSocketEventsFromClient, IRoomSocketEventsFromServer, ISocketRoomGetSessionChatsRequest, ISocketJoinRoomRequest, ISocketRoomGetSessionChatsResponse, ISocketRoomReceiveChat, ISocketJoinRoomResponse, ISocketRoomSendChatRequest, ISocketRoomSendChatResponse } from "@terabithia/shared-types"
import type { ExtendedError } from "socket.io";
import { Server } from "socket.io"

import { IRoomManager } from "../interfaces/room-manager/IRoomManeger";
import { ISocketAuthMiddleware } from "../interfaces/socket-io/middlerware/auth";

export class RoomSocket {
  io: Namespace<IRoomSocketEventsFromClient, IRoomSocketEventsFromServer>;
  //key is the user id 
  connectedUsers: Record<string, IRoomSocket> = {};
  roomManager: IRoomManager; 

  constructor(io: Server, roomManager: IRoomManager, authMiddleware: ISocketAuthMiddleware ) {
    this.roomManager = roomManager
    this.io = io.of("/room")
    //auth middlerware uses acces token to verify indenty then attaches user info to socket.data
    this.io.use((socket, next) => authMiddleware.validateToken(socket, next))
    this.io.use((socket, next) => this.preventDoubleConnections(socket, next))
    this.io.on("connection", (socket) => {
      this.onConnect(socket) 
    })
  }
  
  private preventDoubleConnections(socket: IRoomSocket, next: (error?: ExtendedError) => void): void {
    const user = socket.data.user
    if(!this.connectedUsers[user.id]) {
      next()
    }
    else {
      next(new Error("another device is connected"))
    }
  }

  async onConnect(socket: IRoomSocket) {
    const user = socket.data.user
    
    this.connectedUsers[user.id] = socket
    console.log(`user:${user.username} connected`)

    socket.on("join-room", async (data, ack) => {
      ack(await this.joinRoom(socket, data)) 
    })

    socket.on("send-message", async (data, ack) => {
      ack(await this.sendChat(socket, data)) 
    })

    socket.on("get-active-players-of-room", (data, ack) => {
      ack(this.getActivePlayersOfRoom(socket, data))
    })

    socket.on("get-session-chats", async (data, ack) => {
      ack(this.getSessioChats(socket, data)) 
    })

    socket.on("disconnect", (reason) => this.disconnect(socket, reason) )
  }
  
  async disconnect(socket: IRoomSocket, reason: DisconnectReason) {
    const user = socket.data.user
    const roomId = this.roomManager.getActiveRoomOFUser(user.id)
    delete this.connectedUsers[user.id]
    if(roomId) {
      this.roomManager.kickPlayerFromActiveRoom(user.id, roomId)
    }
  }
  
  getActivePlayersOfRoom(socket: IRoomSocket, data: {}): IRoomSocketGetActivePlayersOfRoomResponse {
    const user = socket.data.user
    const roomId = this.roomManager.getActiveRoomOFUser(user.id)
    if(!roomId) { return [] }
    const activePlayers = this.roomManager.getActivePlayersOfRoom(roomId)

    const activePlayerArray: {username: string}[] = []
    for(const player of Object.values(activePlayers)) {
      if(player.username != user.username) {
        activePlayerArray.push({username: player.username})
      }
    }

    return activePlayerArray
  }

  getSessioChats(socket: IRoomSocket, data: ISocketRoomGetSessionChatsRequest): ISocketRoomGetSessionChatsResponse {
    const user = socket.data.user 
    if(!user) {
      return {
        success: false,
        error: {reason: "user info not found"}
      }
    }

    const roomId = this.roomManager.getActiveRoomOFUser(user.id)
    if(!roomId) {
      return {
        success: false,
        error: {reason: "failed to fetch session chats cant get your roomId"}
      }
    }
    const sessionChats = this.roomManager.getSessionChatsOfRoom(roomId)
    return {
      success: true,
      sessionChats: sessionChats.map(chat => {
        return {
          message: chat.message,
          sender: chat.sender.username,
          indexOrder: chat.indexOrder,
        }
      })
    }   
  }

  async sendChat(socket: IRoomSocket, data: ISocketRoomSendChatRequest): Promise<ISocketRoomSendChatResponse> {
    const user = socket.data.user 
    if(!user) {
      return {
        success: false,
        error: {reason: "user info not found"}
      }
    }
    const roomId = this.roomManager.getActiveRoomOFUser(user.id)
    if(!roomId) {
      return {
        success: false,
        error: {reason: "invalid romId"}
      }
    }

    const sendChatResult = await this.roomManager.sendChatToRoom(roomId, data.message, user )
    
    if(!sendChatResult.success) {
      return {
        success: false,
        error: sendChatResult.error
      }
    }
    const messageBroadcastData:ISocketRoomReceiveChat = {
      message: data.message,
      sender: user.username,
      indexOrder: sendChatResult.indexOrder
    }

    socket.to(roomId).emit("receive-chat", messageBroadcastData)

    return {
      success: true,
      sender: user.username,
      indexOrder: sendChatResult.indexOrder
    } 
  }

  async joinRoom(socket: IRoomSocket, data: ISocketJoinRoomRequest): Promise<ISocketJoinRoomResponse> {
    const user = socket.data.user

    if(!this.roomManager.activeRooms[data.roomId]) {
      const createSessionResult = await this.roomManager.startRoomSession(data.roomId)
      if(!createSessionResult.success) {
        return {
          success: false, 
          error: createSessionResult.error
        } 
      }
    }

    const joinResult = await this.roomManager.joinActiveRoom(user.id, user.username, data.roomId)
    if(!joinResult.success) {
      return {
        success: false,
        error: joinResult.error
      }
    }
    socket.join(data.roomId)
    socket.to(data.roomId).emit("new-player-join", {username: user.username})

    return {
      success: true,
    }
  }
}
