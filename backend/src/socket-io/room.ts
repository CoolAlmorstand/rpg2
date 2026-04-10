
import type {Socket, Namespace, Server } from "socket.io"
import type { ISocketDataOnHandshake, ISocketJoinRoomRequest, ISocketJoinRoomResponse, ISocketResponse, ISocketRoomSendChatRequest, ISocketRoomSendChatResponse } from "@terabithia/shared-types"

import { IRoomManager } from "../interfaces/room-manager/IRoomManeger";
import { ISocketAuthMiddleware } from "../interfaces/socket-io/middlerware/auth";
import { suite } from "node:test";
import { response } from "express";
import { send } from "node:process";

export class RoomSocket {
  io: Namespace;
  //key is the connection id 
  connectedUsers: Record<string, {username: string; id: string;}> = {};
  roomManager: IRoomManager; 

  constructor(io: Server, roomManager: IRoomManager, authMiddleware: ISocketAuthMiddleware ) {
    this.roomManager = roomManager
    this.io = io.of("/room")
    //auth middlerware uses acces token to verify indenty then attaches user info to socket.data
    this.io.use((socket, next) => authMiddleware.validateToken(socket, next))

    this.io.on("connection", (socket) => this.onConnect(socket) )
  }

  async onConnect(socket: Socket) {
    const socketData: ISocketDataOnHandshake = socket.data
    const user = socketData.user

    this.connectedUsers[socket.id] = user
    console.log(`user:${user.username} connected`)

    socket.on("join-room", 
      (
        data: ISocketJoinRoomRequest, 
        responseCallback: ISocketResponse<ISocketJoinRoomResponse>
      ) => this.joinRoom(socket, responseCallback, data) )
  }
  
  async sendChat(socket: Socket, data: ISocketRoomSendChatRequest, responseCallback: ISocketResponse<ISocketRoomSendChatResponse>) {
    const user = this.connectedUsers[socket.id]
    if(!user) {
      responseCallback({
        success: false,
        error: {reason: "user info not found"}
      })
      return
    }
    const {roomId} = this.roomManager.getActiveRoomOFUser(user.id)
    if(!roomId) {
      responseCallback({
        success: false,
        error: {reason: "invalid romId"}
      })
      return
    }

    const sendChatResult = await this.roomManager.sendChatToRoom(roomId, data.message, user )
    
    if(!sendChatResult.success) {
      responseCallback({
        success: false,
        error: sendChatResult.error
      })
      return
    }

    responseCallback({
      success: true,
      indexOrder: sendChatResult.indexOrder
    })
    
  }

  async joinRoom(socket: Socket, responseCallback: ISocketResponse<ISocketJoinRoomResponse>, data: ISocketJoinRoomRequest){
    const user = this.connectedUsers[socket.id]

    if(!this.roomManager.activeRooms[data.roomId]) {
      const createSessionResult = await this.roomManager.startRoomSession(data.roomId)
      if(!createSessionResult.success) {
        responseCallback({
          success: false, 
          error: createSessionResult.error
        }) 
        return
      }
    }

    const joinResult = await this.roomManager.joinActiveRoom(user.id, user.username, data.roomId)
    if(!joinResult.success) {
      responseCallback({
        success: false,
        error: joinResult.error
      })
      return
    }
    responseCallback({
      success: true,
      activePlayers: joinResult.activePlayers.map(user => user.username)
    })
  }
}
