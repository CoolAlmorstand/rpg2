
import type { Server as HttpServer } from "http"


import { Server } from "socket.io";



export function createSocketIOServer(httpServer: HttpServer) {
  const io = new Server(httpServer)
  return io
}
