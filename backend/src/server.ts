

import "dotenv"
import cors from "cors"
import express from "express"
import { createServer } from "http";

  
import cookieParser from "cookie-parser"

import { initializeRoomRoutes } from "./routes/room-router.ts"
import { initializeMapRoutes } from "./routes/maps-router.ts";
import { initializeUserRoutes } from "./routes/user-router.ts";

import { createAuthMiddleware } from "./middleware/auth.ts";

import { createSocketIOServer } from "./socket-io/socket-io.ts";
import { RoomSocket } from "./socket-io/room.ts";
import { createSocketAuthMiddleware } from "./socket-io/middleware/auth.ts";

import { GameRoomManager } from "./game-room/game-room-manager"; 
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
const supabaseAuthHandler = new SupabaseAuthHandler(supabaseManager.supabase)
// const dbMock = new DBMock()
// const authHandlerMock = new MockAuthHandler()

const authMiddleware = createAuthMiddleware(supabaseAuthHandler)

const gameRoomManager = new GameRoomManager(supabaseManager)
const mapsManager = new MapsManager(supabaseManager)
const userManager = new UserManager(supabaseManager, supabaseAuthHandler)

const roomRouter = initializeRoomRoutes(gameRoomManager, authMiddleware, gameRoomManager) 
const mapRouter = initializeMapRoutes(mapsManager)
const userRouter = initializeUserRoutes(userManager, supabaseAuthHandler)

const io = createSocketIOServer(httpServer)
const socketAuthMiddleware = createSocketAuthMiddleware(supabaseAuthHandler)
const roomIoSocketManager = new RoomSocket(io, gameRoomManager, socketAuthMiddleware)

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

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;



