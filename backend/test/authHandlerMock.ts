import { Request, Response, NextFunction } from "express";
import { IAuthHandler, IAuthUserLoginRequest, IAuthUserLoginResponse } from "../src/interfaces/auth/IAuthHandler";




export class MockAuthHandler implements IAuthHandler {
  constructor() {

  }

  async validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.user = {
      id: "useridtest1",
      username: "test1"
    } 
    next() 
  }

  async userLogin(credentials: IAuthUserLoginRequest): Promise<IAuthUserLoginResponse> {
    return {
      success: true,
      username: "test1",
      accessToken: "accessTokenTest1",
      refreshToken: "refreshTokenTest1"
    }
  }
}
