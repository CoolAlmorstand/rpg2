
import type {IAuthCreateAccountDetails} from "@terabithia/shared-types"

export interface IAccountManager {
  createNewAccount(accountDetails: IAuthCreateAccountDetails): Promise<void>;
  accountLogin(accountDetails: IAuthCreateAccountDetails): Promise<void>;
}
