
import { resolve } from "$app/paths";
import type { ISocketJoinRoomRequest, ISocketJoinRoomResponse, ISocketRoomReceiveChat, ISocketRoomSendChatRequest, ISocketRoomSendChatResponse } from "@terabithia/shared-types"
import { io, Socket } from "socket.io-client"
import { sessionChatMessages, apppendToSessionChat } from "./state-stores";
const SERVERURL = import.meta.env.VITE_SERVER_URL

import type { ISocketManager, ISocketManagerConnectResult, ISocketManagerSendChatResult } from "./interface/ISocketManager";

export class SocketManager implements ISocketManager {
  socket: Socket; 
  constructor() {
    this.socket = io(`${SERVERURL}/room`, {
      autoConnect: false,
      withCredentials: true,
    })
  } 

  async connectAndJoinRoom(roomId: string): Promise<ISocketManagerConnectResult> {
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
        const requestData: ISocketJoinRoomRequest = { roomId }
        const response: ISocketJoinRoomResponse = await this.socket.emitWithAck("join-room", requestData)
        
        if (!response.success) {
          resolve({ success: false, error: response.error })
        } else {
          resolve({ success: true, activePlayers: response.activePlayers })
        }
      }

      this.socket.once("connect_error", onConnectError)
      this.socket.once("connect", onConnect)
      this.socket.on("receive-chat", (data) => this.receiveChat(data))
      this.socket.connect()
    })
  }
  
  receiveChat(data: ISocketRoomReceiveChat) {
    apppendToSessionChat(data.message, data.sender, data.indexOrder)
  }

  async sendChat(message: string): Promise<ISocketManagerSendChatResult> {
    const data: ISocketRoomSendChatRequest  = {
      message
    }
    const response: ISocketRoomSendChatResponse = await this.socket.emitWithAck("send-message", data )
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




