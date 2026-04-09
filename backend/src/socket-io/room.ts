
import type {Socket, Namespace, Server } from "socket.io"
import type { ISocketDataOnHandshake, ISocketJoinRoomRequest, ISocketJoinRoomResponse } from "@terabithia/shared-types"

import { IRoomManager } from "../interfaces/room-manager/IRoomManeger";
import { IAuthHandler } from "../interfaces/auth/IAuthHandler";
import cookie from "cookie"
import { ISocketAuthMiddleware } from "../interfaces/socket-io/middlerware/auth";
import { ExtendedError } from "socket.io";

export class RoomSocket {
  io: Namespace;
  //string is the connection id 
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
  }

  async joinRoom(socket: Socket, responseCallback: (response: ISocketJoinRoomResponse) => void){
    const data: ISocketJoinRoomRequest = socket.data
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
    }
    responseCallback({success: true})
  }
}
