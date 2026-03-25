
import { IMapPreview } from "@terabithia/shared-types"
import type { IApiUserCreateAccountRequest, IApiUserCreateAccountResponse} from "@terabithia/shared-types" 

export interface IDBManager {
  getAvailableMaps(): Promise<IMapPreview[]>; 
  createNewAccount(accountDetails: IApiUserCreateAccountRequest): Promise<IApiUserCreateAccountResponse>;
  getUserFromToken(token: string): Promise<string | undefined>
}
