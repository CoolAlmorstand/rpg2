import express from "express";
import { Router } from "express"
import { IRoomManager } from "../interfaces/IRoomManeger";
import { IUserManager } from "../interfaces/user/IUserManager.ts";
import { ICreateRoomData } from "@terabithia/shared-types";
import type { IAuthHandler } from "../interfaces/auth/IAuthHandler.ts"
import cookieParser from "cookie-parser"
import { IDBManager } from "../interfaces/IDBManager.ts";
import { SupabaseManager } from "../supabase/supabase.ts";


const router = Router()

export function initializeRoomRoutes(gameRoomManager: IRoomManager, authHandler: IAuthHandler, supabase: IDBManager) {
  router.post("/check-if-room-exist", express.text(), (req, res) => {
    const roomId = req.body
    if(gameRoomManager.checkIfRoomExist(roomId)) {
      res.send({
        doesGameExist: true
      })
    } else {
      res.send({
        doesGameExist: false 
      })
    }
  })

  router.post("/create-room", cookieParser(), express.json(), async(req, res) => {
    const token = req.cookies["auth-token"]

    if(!authHandler.validateToken(token)) { res.send(401) }

    const userId = supabase.getUserFromToken(token)

    if(!userId) { res.send(409) }

    const gameData: ICreateRoomData = req.body

    supabase.create
  })

  return router
}

