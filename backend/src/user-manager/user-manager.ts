import { response } from "express";
import type { IDBManager } from "../interfaces/IDBManager"; 
import type {IUserLoginResponse, IUserLoginRequest, IUserCreateAccountRequest, IUserCreateAccountResponse} from "@terabithia/shared-types" 
import type { IUserManager } from "../interfaces/IUserManager";
import { IAuthHandler } from "../interfaces/IAuthHandler";



export class UserManager implements IUserManager {
  supabase: IDBManager 
  authHandler: IAuthHandler

  constructor(supabase: IDBManager, authHadler: IAuthHandler) {
    this.supabase = supabase
    this.authHandler = authHadler
  }
  
  async createNewAccount(accountDetails: IUserCreateAccountRequest): Promise<IUserCreateAccountResponse> {
    const dbResponse = await this.supabase.createNewAccount(accountDetails)
    
    if( dbResponse.error ) {
      return {
        success: false,
        error: {reason: dbResponse.error.message}
      }
    } else {
      return {
        success: true
      }
    }
  }
  async accountLogin(credentials: IUserLoginRequest): Promise<IUserLoginResponse> {
    return await this.authHandler.userLogin(credentials) 
  }
}
