

import "dotenv"
import cors from "cors"
import express from "express"
import { createServer } from "http";

  
import { GameRoomManager } from "./game-room/game-room-manager"; 
import { initializeRoomRoutes } from "./routes/room-router.ts"
import { initializeMapRoutes } from "./routes/maps-router.ts";
import { initializeAuthRoutes } from "./routes/auth-router.ts";
import { createSocketIOServer } from "./socket-io/socket-io.ts";
import { RoomIoSocket } from "./socket-io/room.ts";
import { SupabaseManager } from "./supabase/supabase.ts";
import { MapsManager } from "./maps-manager/maps-manager.ts";
import { AccountManager } from "./account-manager/account-manager.ts";


const PORT = process.env.PORT || 3000;

const app = express(); 
const httpServer = createServer(app)

const supabaseManager = new SupabaseManager()
const gameRoomManager = new GameRoomManager()
const mapsManager = new MapsManager(supabaseManager)
const accountsManager = new AccountManager(supabaseManager)


const roomRouter = initializeRoomRoutes(gameRoomManager) 
const mapRouter = initializeMapRoutes(mapsManager)
const authRouter = initializeAuthRoutes(accountsManager)

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use("/rooms", roomRouter)
app.use("/map", mapRouter)
app.use("/auth", authRouter)

const io = createSocketIOServer(httpServer) 
const roomIoSocketManager = new RoomIoSocket(io, gameRoomManager)  



httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;



