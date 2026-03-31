
import { IMapPreview, ICreateRoomData } from "@terabithia/shared-types"
import type { IApiUserCreateAccountRequest, IApiUserCreateAccountResponse} from "@terabithia/shared-types" 

export type IRoomMembersRowInsertValues = {
  user_id: string;
  room_id: string;
}

export type IRoomRow = {
  id: string;
  name: string;
  owner_id: string;
}

export type IRoomMemberRow = {
  user_id: string;
  room_id: string;
} 

export type IGetRoomOfUserResponse = {
  success: true;
  rooms: IRoomRow[];
} | {
  success: false;
  error: {reason: string}
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
  getRoomsOfUser(userId: string): Promise<IGetRoomOfUserResponse> 
}
