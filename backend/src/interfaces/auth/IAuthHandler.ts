
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

export type IAuthRefreshTokenResult = {
  success: true;
  accessToken: string;
  refreshToken: string;
} | {
  success: false;
  error: {reason: string}
}

export type IAuthValidateTokenResult = {
  success: true; 
  username: string;
  userId: string;
} | {
  success: false;
  error: {reason: string}
}

export interface IAuthHandler {
  refreshToken(token: string): Promise<IAuthRefreshTokenResult>;
  validateToken(token: string): Promise<IAuthValidateTokenResult>;
  userLogin(credentials: IAuthUserLoginRequest): Promise<IAuthUserLoginResponse>
}
