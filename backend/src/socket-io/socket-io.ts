
import type { Server as HttpServer } from "http"
import { Server } from "socket.io";


const a = 20

export function createSocketIOServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST"]
    }
  })
  return io
}
