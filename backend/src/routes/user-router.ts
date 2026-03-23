import express, { response } from "express";
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
    const response: IUserLoginResponse = await userManager.accountLogin(accountDetails)

    if(response.success) {
      console.log("jdk")
      res.cookie("auth-token", response.token, {
        httpOnly: true,       
        secure: process.env.NODE_ENV === "production",     
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000 
      })
    }
    res.json(response)
  })
  return router
}



