import express, { response } from "express";
import { Router } from "express"
import { IRoomManager, IRoomCreateRoomData } from "../interfaces/IRoomManeger";
import { IUserManager } from "../interfaces/user/IUserManager.ts";
import { IAPIGetRoomsOfUserResponse, IAPIJoinRoomResponse, IAPIJoinRoom, IAPICreateRoomData, IAPICreateRoomResponse } from "@terabithia/shared-types";
import type { IAuthHandler } from "../interfaces/auth/IAuthHandler.ts"
import cookieParser from "cookie-parser"
import { IDBManager } from "../interfaces/IDBManager.ts";
import { error } from "node:console";

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
      roomName: requestData.roomName,
      ownerUsername: req.user.username,
      ownerId: req.user.id
    }

    const createRoomResult = await roomManager.createNewRoom(createrGameData)
    if(createRoomResult.success) {
      const response: IAPICreateRoomResponse = {
        success: true,
        ownerUsername: req.user.username,
        roomId: createRoomResult.roomId
      }

      res.send(response)
    }
    else {
      const response: IAPICreateRoomResponse = {
        success: false,
        error: {reason: createRoomResult.error.reason}
      }
      res.send(response)
    }
  })
    
  router.post("/join-room", ((req, res, next) => authHandler.validateToken(req, res, next)), express.json(), async(req, res) => { 
    const requestData: IAPIJoinRoom = req.body
    const joinRoomResult = await roomManager.joinRoom(req.user.id, requestData.roomId) 

    if(!joinRoomResult.success) {
      const response: IAPIJoinRoomResponse = {
        success: false,
        error: joinRoomResult.error 
      }
      res.send(response)
    } 
    else {
      const response = {
        success: true,
        ownerUsername: joinRoomResult.ownerUsername,
        roomName: joinRoomResult.roomName
      }
      res.send(response)
    }
  })

  return router
}

