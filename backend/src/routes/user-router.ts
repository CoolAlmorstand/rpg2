import express from "express";
import { Router } from "express"
import type {IUserLoginResponse, IUserLoginRequest, IUserCreateAccountRequest, IUserCreateAccountResponse} from "@terabithia/shared-types" 

import { IUserManager } from "../interfaces/IUserManager";
const router = Router()

export function initializeUserRoutes(userManager: IUserManager) {
  router.post("/create-account", express.json(), async (req, res) => {
    const accountDetails: IUserCreateAccountRequest = req.body 
    const response: IUserCreateAccountResponse = await userManager.createNewAccount(accountDetails)
    res.json(response)
  })
  
  router.post("/login-account", express.json(), async (req, res) => {
    const accountDetails: IUserLoginRequest = req.body 
    const reponse: IUserLoginResponse = await userManager.accountLogin(accountDetails)
    res.json(reponse)
  })
  return router
}



