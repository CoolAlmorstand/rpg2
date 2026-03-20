
import { IMapPreview, IAuthCreateAccountDetails } from "@terabithia/shared-types"
import { Session, AuthResponse } from "@supabase/supabase-js";

export interface ISupabaseManager {
  getAvailableMaps(): Promise<IMapPreview[]>; 
  createNewAccount(accountDetails: IAuthCreateAccountDetails): Promise<AuthResponse>;
  accountLogin(accountDetails: IAuthCreateAccountDetails): Promise<AuthResponse>;

}
