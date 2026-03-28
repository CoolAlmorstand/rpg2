
import { ISessionToken } from "./ISessionToken.ts"
import type { Request, Response, NextFunction } from "express";

export type IAuthUserLoginRequest = {
  username: string;
  password: string;
}

export type IAuthUserLoginResponse = {
  success: true;
  accessToken: string;
  refreshToken: string;
  username: string;
} | {
  success: false;
  error: {reason: string};
}

export type IRefreshTokenResult = {
  success: true;
  accessToken: string;
  refreshToken: string;
} | {
  success: false;
  error: {reason: string}
}

export interface IAuthHandler {
  refreshToken(token: string): Promise<IRefreshTokenResult>;
  validateToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  userLogin(credentials: IAuthUserLoginRequest): Promise<IAuthUserLoginResponse>
}
