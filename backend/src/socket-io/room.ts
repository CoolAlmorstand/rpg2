
import type {Socket, Namespace, Server, DisconnectReason } from "socket.io"
import type { ISocketDataOnHandshake, ISocketRoomGetSessionChatsRequest, ISocketJoinRoomRequest, ISocketRoomGetSessionChatsResponse, ISocketRoomReceiveChat, ISocketJoinRoomResponse, ISocketResponse, ISocketRoomSendChatRequest, ISocketRoomSendChatResponse } from "@terabithia/shared-types"

import { IRoomManager } from "../interfaces/room-manager/IRoomManeger";
import { ISocketAuthMiddleware } from "../interfaces/socket-io/middlerware/auth";

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
      ) => this.joinRoom(socket, responseCallback, data) 
    )
    socket.on("send-message", 
      ( 
      data: ISocketRoomSendChatRequest,
      responseCallback: ISocketResponse<ISocketRoomSendChatResponse>
      ) => this.sendChat(socket, data, responseCallback) 
    )
    socket.on("get-session-chats", 
      ( 
      data: ISocketRoomGetSessionChatsRequest,
      responseCallback: ISocketResponse<ISocketRoomGetSessionChatsResponse>
      ) => this.getSessioChats(socket, data, responseCallback) 
    )

    socket.on("disconnect", (reason) => this.disconnect(socket, reason) )
  }
  
  async disconnect(socket: Socket, reason: DisconnectReason) {
    const user = this.connectedUsers[socket.id]
    const roomId = this.roomManager.getActiveRoomOFUser(user.id)
    if(roomId) {
      delete this.connectedUsers[socket.id]
      this.roomManager.kickPlayerFromActiveRoom(user.id, roomId)
    }
  }
  
  getSessioChats(socket: Socket, data: ISocketRoomGetSessionChatsRequest, responseCallback: ISocketResponse<ISocketRoomGetSessionChatsResponse>) {
    const user = this.connectedUsers[socket.id]
    if(!user) {
      responseCallback({
        success: false,
        error: {reason: "user info not found"}
      })
      return
    }

    const roomId = this.roomManager.getActiveRoomOFUser(user.id)
    if(!roomId) {
      responseCallback({
        success: false,
        error: {reason: "failed to fetch session chats cant get your roomId"}
      })
      return
    }
    const sessionChats = this.roomManager.getSessionChatsOfRoom(roomId)
    responseCallback({
      success: true,
      sessionChats: sessionChats.map(chat => {
        return {
          message: chat.message,
          sender: chat.sender.username,
          indexOrder: chat.indexOrder,
        }
      }) 
    })     
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
    const roomId = this.roomManager.getActiveRoomOFUser(user.id)
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
    const messageBroadcastData:ISocketRoomReceiveChat = {
      message: data.message,
      sender: user.username,
      indexOrder: sendChatResult.indexOrder
    }
    socket.to(roomId).emit("receive-chat", messageBroadcastData)

    responseCallback({
      success: true,
      sender: user.username,
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
    socket.join(data.roomId)
    responseCallback({
      success: true,
      activePlayers: joinResult.activePlayers.map(user => user.username)
    })
  }
}
