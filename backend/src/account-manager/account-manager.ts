import { IAccountManager } from "../interfaces/IAccountManager";
import { ISupabaseManager } from "../interfaces/ISupabaseManager";
import type { IAuthCreateAccountDetails } from "@terabithia/shared-types"



export class AccountManager implements IAccountManager {
  supabase: ISupabaseManager
  
  constructor(supabase: ISupabaseManager) {
    this.supabase = supabase
  }

  async createNewAccount(accountDetails: IAuthCreateAccountDetails) {
    const response = await this.supabase.createNewAccount(accountDetails)     
  }

  async accountLogin(accountDetails: IAuthCreateAccountDetails): Promise<void> {
    const response = await this.supabase.accountLogin(accountDetails)
  }
}
