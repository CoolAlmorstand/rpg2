

import "dotenv"
import cors from "cors"
import express from "express"
import { createServer } from "http";

  
import cookieParser from "cookie-parser"
import { GameRoomManager } from "./game-room/game-room-manager"; 
import { initializeRoomRoutes } from "./routes/room-router.ts"
import { initializeMapRoutes } from "./routes/maps-router.ts";
import { initializeUserRoutes } from "./routes/user-router.ts";
import { createSocketIOServer } from "./socket-io/socket-io.ts";
import { RoomIoSocket } from "./socket-io/room.ts";
import { SupabaseManager } from "./supabase/supabase.ts";
import { MapsManager } from "./maps-manager/maps-manager.ts";
import { UserManager } from "./user-manager/user-manager.ts";
import { SupabaseAuthHandler } from "./auth/auth.ts";

import { DBMock } from "../test/dbMock.ts";
import { MockAuthHandler } from "../test/authHandlerMock.ts";

import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express(); 
const httpServer = createServer(app)

const supabaseManager = new SupabaseManager()
const dbMock = new DBMock()
const authHandlerMock = new MockAuthHandler()

const gameRoomManager = new GameRoomManager(supabaseManager)
const supabaseAuthHandler = new SupabaseAuthHandler(supabaseManager.supabase)
const mapsManager = new MapsManager(supabaseManager)
const userManager = new UserManager(supabaseManager, supabaseAuthHandler)


const roomRouter = initializeRoomRoutes(gameRoomManager, supabaseAuthHandler, gameRoomManager) 
const mapRouter = initializeMapRoutes(mapsManager)
const userRouter = initializeUserRoutes(userManager, supabaseAuthHandler)

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors(
  { 
    origin: process.env.CLIENT_URL,
    credentials: true
  }
));
app.use("/rooms", roomRouter)
app.use("/map", mapRouter)
app.use("/user", userRouter)

const io = createSocketIOServer(httpServer) 
const roomIoSocketManager = new RoomIoSocket(io, gameRoomManager)  



httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;



