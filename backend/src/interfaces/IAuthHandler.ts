



import type { IUserLoginResponse, IUserCreateAccountRequest } from "@terabithia/shared-types"



export interface ISessionToken {
  username: string;
  totalLife: number;
  remainingLife: number;
  token: string;
  startExpireTimer(callback: Function): Promise<void>;
  resetExpireTimer(): void; 
}


export interface IAuthHandler {
  sessionTokens: Record<string, {username: string}>
  userLogin(credentials: IUserCreateAccountRequest): Promise<IUserLoginResponse>
  validateToken(token: string): boolean;
}
