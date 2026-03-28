
import { IMapPreview, ICreateRoomData } from "@terabithia/shared-types"
import type { IApiUserCreateAccountRequest, IApiUserCreateAccountResponse} from "@terabithia/shared-types" 

export type IRoomMembersRowInsertValues = {
  user_id: string;
  room_id: string;
}

export type IRoomRow = {
  uuid: string;
  owner: string;
}

export type createRoomResult = {
  uuid: string;
  roomCode: string;
}

export interface IDBManager {
  getAvailableMaps(): Promise<IMapPreview[]>; 
  createNewAccount(accountDetails: IApiUserCreateAccountRequest): Promise<IApiUserCreateAccountResponse>;
  getUserFromToken(token: string): Promise<string | undefined>
  createRoom(createRoomData: ICreateRoomData, ownerId: string): Promise<{IRoomRow}>
}
