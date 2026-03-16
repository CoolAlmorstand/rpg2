

import "dotenv"
import cors from "cors"
import express from "express"
import { createServer } from "http";

  
import { GameRoomManager } from "./game-room/game-room-manager"; 
import { initializeRoomRoutes } from "./routes/room-router.ts"
import { createSocketIOServer } from "./socket-io/socket-io.ts";
import { RoomIoSocket } from "./socket-io/room.ts";


const PORT = process.env.PORT || 3000;

const app = express(); 
const httpServer = createServer(app)

const gameRoomManager = new GameRoomManager()

const roomRouter = initializeRoomRoutes(gameRoomManager) 

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/rooms", roomRouter)

const io = createSocketIOServer(httpServer) 
const roomIoSocketManager = new RoomIoSocket(io, gameRoomManager)  



httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;



