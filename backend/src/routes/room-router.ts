import express from "express";
import { Router } from "express"
import { IRoomManager } from "../interfaces/IRoomManeger";
import { IAccountManager } from "../interfaces/IAccountManager";
import { ICreateRoomData } from "@terabithia/shared-types";

const router = Router()

export function initializeRoomRoutes(gameRoomManager: IRoomManager) {
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

  router.post("/create-room", express.json(), async(req, res) => {
    const gameData: ICreateRoomData = req.body
    
    console.log(gameData)
  })

  return router
}

