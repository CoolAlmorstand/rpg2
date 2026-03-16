import express from "express";
import { Router } from "express"
import { IRoomManager } from "../interfaces/IRoomManeger";

const router = Router()

export function initializeRoomRoutes(gameRoomManager: IRoomManager ) {
  router.post("/check-if-room-exist", express.text(), (req, res) => {
    const roomId = req.body
    if(gameRoomManager.checkIfRoomExist(roomId)) {
      res.send({
        doesGameExist: true
      })
    } else {
      res.send({
        doesGameExist: true 
      })
    } 
  })



  router.post("/create-game", express.json(), async(req, res) => {
    const gameData = req.body
  })

  return router
}

