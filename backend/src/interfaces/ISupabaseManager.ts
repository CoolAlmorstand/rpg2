
import { IMapPreview, IAuthCreateAccountDetails } from "@terabithia/shared-types"

export interface ISupabaseManager {
  getAvailableMaps(): Promise<IMapPreview[]>; 
  createNewAccount(accountDetails: IAuthCreateAccountDetails): Promise<void>;
  accountLogin(accountDetails: IAuthCreateAccountDetails): Promise<void>;

}
