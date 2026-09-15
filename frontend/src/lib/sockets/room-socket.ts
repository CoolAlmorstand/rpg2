


import type { ISocketRoomNewPlayerJoin, IRoomSocketEventsFromClient, IRoomSocketEventsFromServer, ISocketRoomReceiveChat } from "@terabithia/shared-types"
import type { IRoomSocketManagerSendChatResult, IRoomSocketManagerConnectResult, IRoomSocketManagerGetActivePlayersResult, IRoomSocketManager, IRoomSocketManagerEventTypes, IRoomGetSessionChatsResult } from "./interfaces/IRoomSocket.ts";

import { io, Socket } from "socket.io-client"
import mitt from "mitt"

const SERVERURL = import.meta.env.VITE_SERVER_URL


class RoomSocketManager implements IRoomSocketManager {
  event = mitt<IRoomSocketManagerEventTypes>()
  socket: Socket<IRoomSocketEventsFromServer, IRoomSocketEventsFromClient>; 
  constructor() {
    this.socket = io(`${SERVERURL}/room`, {
      autoConnect: false,
      withCredentials: true,
    })
  } 
  
  async getSessionChats(): Promise<IRoomGetSessionChatsResult> { 
    const getSessionChatsResponse = await this.socket.emitWithAck("get-session-chats", {}) 
    if(!getSessionChatsResponse.success) {
      return {
        success: false,
        error: getSessionChatsResponse.error
      }   
    }

    return {
        success: true,
        sessionChats: getSessionChatsResponse.sessionChats
      }
  }
  
  async getActivePlayers(): Promise<IRoomSocketManagerGetActivePlayersResult> {
    const player = await this.socket.emitWithAck("get-active-players-of-room", {})
    console.log(player)
    return player
  }

  async connectAndJoinRoom(roomId: string): Promise<IRoomSocketManagerConnectResult> {
    return new Promise((resolve) => {

      const cleanup = () => {
        this.socket.off("connect", onConnect)
        this.socket.off("connect_error", onConnectError)
      }

      const onConnectError = (error: Error) => {
        cleanup()
        resolve({ success: false, error: { reason: error.message } })
      }

      const onConnect = async () => {
        cleanup()
        const response = await this.socket.emitWithAck("join-room", { roomId })
        
        if (!response.success) {
          resolve({ success: false, error: response.error })
        } else {
          resolve({ success: true, })
        }
      }

      this.socket.once("connect_error", onConnectError)
      this.socket.once("connect", onConnect)
      this.socket.on("receive-chat", (data) => this.receiveChat(data))
      this.socket.on("new-player-join", (data) => this.newPlayerJoin(data))
      this.socket.connect()
    })
  }
  
  receiveChat(data: ISocketRoomReceiveChat) {
    this.event.emit("chat-receive", data)
  }
  
  newPlayerJoin(data: ISocketRoomNewPlayerJoin) {
    this.event.emit("new-player-join", data)
  }

  async sendChat(message: string): Promise<IRoomSocketManagerSendChatResult> { 
    const response = await this.socket.emitWithAck("send-message", {
      message
    })
    if(!response.success) {
      return {
        success: false,
        error: response.error
      }
    }
    else {
      return {
        success: true,
        sender: response.sender,
        indexOrder: response.indexOrder
      }
    }
  } 
}


export function createRoomSocketManager() {
  return new RoomSocketManager()
}
