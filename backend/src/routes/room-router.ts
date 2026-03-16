import express from "express";
import { Router } from "express"
import type { Request, Response } from "express"; 

import { GameRoomManager } from "../game-room/game-room-manager"; 

const router = Router()
const gameRoomMangeer = new GameRoomManager()

router.post("/check-if-room-exist", express.text(), (req, res) => {
  const roomId = req.body
  if(gameRoomMangeer.checkIfRoomExist(roomId)) {
    res.send({
      doesGameExist: true
    })
  } else {
    res.send({
      doesGameExist: false
    })
  } 
})



router.post("/create-game", express.json(), async(req, res) => {
  const gameData = req.body
  const gameRoomMangeer
})

export default router


