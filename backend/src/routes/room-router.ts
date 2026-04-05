import express, { response } from "express";
import { Router } from "express"
import { IRoomManager, IRoomCreateRoomData } from "../interfaces/IRoomManeger";
import { IUserManager } from "../interfaces/user/IUserManager.ts";
import { IAPIGetRoomsOfUserResponse, IAPICreateRoomData } from "@terabithia/shared-types";
import type { IAuthHandler } from "../interfaces/auth/IAuthHandler.ts"
import cookieParser from "cookie-parser"
import { IDBManager } from "../interfaces/IDBManager.ts";

const router = Router()

export function initializeRoomRoutes(gameRoomManager: IRoomManager, authHandler: IAuthHandler, roomManager: IRoomManager) {
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
  router.get("/get-rooms-of-user", ((req, res, next) => authHandler.validateToken(req, res, next)), async(req, res) => {
    const userId = req.user.id 
    const getRoomsResult = await roomManager.getRoomsOfUser(userId)

    if(!getRoomsResult.success) {
      const response: IAPIGetRoomsOfUserResponse = {
        success: false,
        error: getRoomsResult.error
      }
      res.send(response)
    }
    else {
      const response: IAPIGetRoomsOfUserResponse = {
        success: true,
        rooms: getRoomsResult.rooms
      }
      res.send(response)
    } 
  })
  router.post("/create-room", ((req, res, next) => authHandler.validateToken(req, res, next)), express.json(), async(req, res) => { 
    const requestData: IAPICreateRoomData = req.body

    const createrGameData: IRoomCreateRoomData = {
      mapName: requestData.mapName,
      ownerUsername: req.user.username,
      ownerId: req.user.id
    } 

    const roomId = await roomManager.createNewRoom(createrGameData)
    console.log(roomId) 
  })

  return router
}

