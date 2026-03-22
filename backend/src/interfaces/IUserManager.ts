
import type {IUserLoginResponse, IUserLoginRequest, IUserCreateAccountRequest, IUserCreateAccountResponse} from "@terabithia/shared-types" 

export interface IUserManager {
  createNewAccount(accountDetails: IUserCreateAccountRequest): Promise<IUserCreateAccountResponse>;
  accountLogin(credentials: IUserLoginRequest): Promise<IUserLoginResponse>;
}
