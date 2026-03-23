import express from "express";
import { Router } from "express"
import { IRoomManager } from "../interfaces/IRoomManeger";
import { IUserManager } from "../interfaces/IUserManager";
import { ICreateRoomData } from "@terabithia/shared-types";

import cookieParser from "cookie-parser"


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

  router.post("/create-room", cookieParser(), express.json(), async(req, res) => {

    console.log(req.cookies["auth-token"])
    const gameData: ICreateRoomData = req.body 
  })

  return router
}

