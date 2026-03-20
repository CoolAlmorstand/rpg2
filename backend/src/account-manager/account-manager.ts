import { response } from "express";
import { IAccountManager } from "../interfaces/IAccountManager";
import { ISupabaseManager } from "../interfaces/ISupabaseManager";
import type { IAuthCreateAccountDetails, IAuthLoginAttemptResponse } from "@terabithia/shared-types"



export class AccountManager implements IAccountManager {
  supabase: ISupabaseManager
  
  constructor(supabase: ISupabaseManager) {
    this.supabase = supabase
  }

  async createNewAccount(accountDetails: IAuthCreateAccountDetails): Promise<IAuthLoginAttemptResponse> {
    const dbResponse = await this.supabase.createNewAccount(accountDetails)
    
    if( dbResponse.error ) {
      const response: IAuthLoginAttemptResponse = {
        success: false,
        error: {
          reason: dbResponse.error.message
        }
      }

      return response
    } else {
      const response: IAuthLoginAttemptResponse = {
        success: true,
        username: dbResponse.data.user!.user_metadata.username,
        token: dbResponse.data.session!.access_token
      }

      return response
    }

  }

  async accountLogin(accountDetails: IAuthCreateAccountDetails): Promise<IAuthLoginAttemptResponse> {
    const dbResponse = await this.supabase.accountLogin(accountDetails)

    if( dbResponse.error ) {
      const response: IAuthLoginAttemptResponse = {
        success: false,
        error: {
          reason: dbResponse.error.message
        }
      }

      return response
    } else {
      const response: IAuthLoginAttemptResponse = {
        success: true,
        username: dbResponse.data.user!.user_metadata.username,
        token: dbResponse.data.session!.access_token
      }

      return response
    }
  }
}
