
import type { Namespace, Server } from "socket.io"
import type { ICreateGameData, IJoinRoomData } from '@terabithia/shared-types'
import { IRoomSocket } from "../interfaces/socket-io/IRoom"
import { IRoomManager } from "../interfaces/IRoomManeger";



export class RoomIoSocket implements IRoomSocket {
  io: Namespace;
  roomManager: IRoomManager; 

  constructor(io: Server, roomManager: IRoomManager ) {
    this.roomManager = roomManager

    this.io = io.of("/room") 
    this.io.on("connection", (socket) => {
      console.log(`client: ${socket.id} connected!`)

      socket.on("join-room", (data: IJoinRoomData) => {
        console.log("attempted to join")
        console.log(data.username)
      })

      socket.on("create-game", async ( data: ICreateGameData ) => {
        console.log("")
      })
    }) 
  } 
}
