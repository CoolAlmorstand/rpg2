
import express from "express";
import { Router } from "express"
import { IMapManager } from "../interfaces/IMapManager";

const router = Router()

export function initializeMapRoutes(mapsManager: IMapManager ) {
  router.post("/get-available-maps", express.text(), async (req, res) => {
    console.log('s')
    const availableMaps = await mapsManager.getAvailableMaps()
    console.log(availableMaps)
    res.json(availableMaps)
  })
  
  return router
}



