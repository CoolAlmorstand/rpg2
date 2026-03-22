
import { IMapPreview, IAuthLoginAttemptResponse } from "@terabithia/shared-types"
import type { IUserCreateAccountRequest, IUserCreateAccountResponse} from "@terabithia/shared-types" 

export interface IDBManager {
  getAvailableMaps(): Promise<IMapPreview[]>; 
  createNewAccount(accountDetails: IUserCreateAccountRequest): Promise<IUserCreateAccountResponse>;
}
