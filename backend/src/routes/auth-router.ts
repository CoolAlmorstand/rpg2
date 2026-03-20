import express from "express";
import { Router } from "express"
import type { IAuthCreateAccountDetails } from "@terabithia/shared-types"
import { IAccountManager } from "../interfaces/IAccountManager";
const router = Router()

export function initializeAuthRoutes(accountManager: IAccountManager) {
  router.post("/create-account", express.json(), async (req, res) => {
    const accountDetails: IAuthCreateAccountDetails = req.body 

    res.json(await accountManager.createNewAccount(accountDetails))
  })
  
  router.post("/login-account", express.json(), async (req, res) => {
    const accountDetails: IAuthCreateAccountDetails = req.body 

    res.json(await accountManager.accountLogin(accountDetails))
  })
  return router
}



