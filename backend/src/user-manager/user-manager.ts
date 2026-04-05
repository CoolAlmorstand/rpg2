import type { IDBManager } from "../interfaces/IDBManager.ts"
import type { IUserCreateAccountRequest, IUserCreateAccountResponse, IUserLoginRequest, IUserLoginResponse, IUserManager } from "../interfaces/user/IUserManager.ts"
import type { IAuthHandler } from "../interfaces/auth/IAuthHandler.ts"

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
        success: true,
      }
    }
  }
  
  async accountLogin(credentials: IUserLoginRequest): Promise<IUserLoginResponse> {
    return await this.authHandler.userLogin(credentials)
  }
} 
  
