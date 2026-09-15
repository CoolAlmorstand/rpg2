import type  { IAuthHandler } from "../interfaces/auth/IAuthHandler";
import type { Request, Response, NextFunction } from "express";
import { IAuthMiddleware } from "../interfaces/middleware/auth-middleware";



export function createAuthMiddleware(authHandler: IAuthHandler): IAuthMiddleware { 
  const authMiddlerware: IAuthMiddleware = {
    validtateToken: async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies["access-token"] 
      const validateTokenResult = await authHandler.validateToken(token)

      if(!validateTokenResult.success) {
        const response = { success: false, reason: "unathorized" }
        res.status(401).send(response)
        return
      }

      req.user = {
        id: validateTokenResult.userId,
        username: validateTokenResult.username
      }
      next() 
    }  
  }

  return authMiddlerware
}
