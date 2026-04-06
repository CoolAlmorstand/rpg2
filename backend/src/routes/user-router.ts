import type { IApiUserCreateAccountRequest, IApiUserCreateAccountResponse, IApiUserLoginRequest, IApiUserLoginResponse } from "@terabithia/shared-types"
import type { IUserLoginResponse, IUserCreateAccountResponse } from "../interfaces/user/IUserManager"
import type { IUserManager } from "../interfaces/user/IUserManager";

import express from "express"
import { Router } from "express"
import { IAuthHandler } from "../interfaces/auth/IAuthHandler";
const router = Router()

export function initializeUserRoutes(userManager: IUserManager, authHandler: IAuthHandler, ) {

  router.get("/refresh-session", async (req, res) => {
    const token = req.cookies["refresh-token"]
    const result = await authHandler.refreshToken(token)
    
    if(!result.success) {
      res.status(401).send("invalid refresh token")
      return
    }
    
    res.cookie("access-token", result.accessToken, {
      httpOnly: true,       
      secure: process.env.NODE_ENV === "production",     
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 60 * 60 * 1000 
    })

    res.cookie("refresh-token", result.refreshToken, {
      httpOnly: true,       
      secure: process.env.NODE_ENV === "production",     
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000 
    })

    res.send(200)
  })

  router.post("/create-account", express.json(), async (req, res) => {
    const accountDetails: IApiUserCreateAccountRequest = req.body 
    const response: IUserCreateAccountResponse = await userManager.createNewAccount(accountDetails)
    res.json(response)
  })
  
  router.post("/login-account", express.json(), async (req, res) => {
    const accountDetails: IApiUserLoginRequest = req.body 
    const loginResult: IUserLoginResponse = await userManager.accountLogin(accountDetails)

    if(loginResult.success) {
      res.cookie("access-token", loginResult.accessToken, {
        httpOnly: true,       
        secure: process.env.NODE_ENV === "production",     
        sameSite: process.env.NODE_ENV == "production" ? "none" : "strict", 
        maxAge: 60 * 60 * 1000 
      })

      res.cookie("refresh-token", loginResult.refreshToken, {
        httpOnly: true,       
        secure: process.env.NODE_ENV === "production",     
        sameSite: process.env.NODE_ENV == "production" ? "none" : "strict", 
        maxAge: 60 * 60 * 1000 
      })

      const response: IApiUserLoginResponse = {
        success: true,
        username: loginResult.username
      }
      res.json(response)
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



