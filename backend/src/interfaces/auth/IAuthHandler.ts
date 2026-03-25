
import { ISessionToken } from "./ISessionToken.ts"

export type IAuthUserLoginRequest = {
  username: string;
  password: string;
}

export type IAuthUserLoginResponse = {
  success: true;
  token: string;
  username: string;
} | {
  success: false;
  error: {reason: string};
}

export interface IAuthHandler {
  validateToken(token: string): boolean
  userLogin(credentials: IAuthUserLoginRequest): Promise<IAuthUserLoginResponse>
  tokenExpire(sessionToken: ISessionToken): void;
}
