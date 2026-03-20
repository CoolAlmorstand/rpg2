
import type {IAuthCreateAccountDetails, IAuthLoginAttemptResponse} from "@terabithia/shared-types" 

export interface IAccountManager {
  createNewAccount(accountDetails: IAuthCreateAccountDetails): Promise<IAuthLoginAttemptResponse>;
  accountLogin(accountDetails: IAuthCreateAccountDetails): Promise<IAuthLoginAttemptResponse>;
}
