import type { IApiUserCreateAccountRequest, IApiUserCreateAccountResponse, IApiUserLoginRequest, IApiUserLoginResponse } from "@terabithia/shared-types"
import type { IUserLoginResponse, IUserCreateAccountResponse } from "../interfaces/user/IUserManager"
import type { IUserManager } from "../interfaces/user/IUserManager";


import express from "express"
import { Router } from "express"
import { error } from "node:console";
const router = Router()


export function initializeUserRoutes(userManager: IUserManager) {
  router.post("/create-account", express.json(), async (req, res) => {
    const accountDetails: IApiUserCreateAccountRequest = req.body 
    const response: IUserCreateAccountResponse = await userManager.createNewAccount(accountDetails)
    res.json(response)
  })
  
  router.post("/login-account", express.json(), async (req, res) => {
    const accountDetails: IApiUserLoginRequest = req.body 
    const loginResult: IUserLoginResponse = await userManager.accountLogin(accountDetails)

    if(loginResult.success) {
      res.cookie("auth-token", loginResult.token, {
        httpOnly: true,       
        secure: process.env.NODE_ENV === "production",     
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
      const response: IApiUserLoginResponse = {
        success: true,
        username: loginResult.username
      }
      res.json(loginResult)
    } else {
      const response: IApiUserLoginResponse = {
        success: false,
        error: { reason: loginResult.error.reason }
      }
      res.send(response)
    }
  })
  return router
}



