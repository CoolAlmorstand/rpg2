
import type {Socket, Namespace, Server } from "socket.io"
import type { ISocketDataOnHandshake } from "@terabithia/shared-types"

import { IRoomManager } from "../interfaces/IRoomManeger";
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
    this.io.use((socket, next) => authMiddleware.validateToken(socket, next))

    this.io.on("connection", (socket) => this.onConnect(socket) )
  }

  async onConnect(socket: Socket) {
    const socketData: ISocketDataOnHandshake = socket.data
    const user = socketData.user
    console.log(user)
    console.log("hiyaaa")
    this.connectedUsers[socket.id] = user

  }
}
