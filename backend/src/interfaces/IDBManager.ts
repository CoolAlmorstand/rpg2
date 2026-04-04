
import { SupabaseClient } from "@supabase/supabase-js";
import { IMapPreview } from "@terabithia/shared-types"
import type { IApiUserCreateAccountRequest, IApiUserCreateAccountResponse} from "@terabithia/shared-types" 

export type IDBRoomMembersRowInsertValues = {
  user_id: string;
  room_id: string;
}

export type IDBRoomRow = {
  id: string;
  name: string;
  owner_name: string;
  owner_id: string;
}

export type IDBRoomMemberRow = {
  user_id: string;
  room_id: string;
} 

export type IDBGetRoomOfUserResponse = {
  success: true;
  rooms: IDBRoomRow[];
} | {
  success: false;
  error: {reason: string}
}

export type IDBCreateNewRoomResult = {
  success: true;
  roomId: string;
} | {
  success: false;
  error: { reason: string }
}

export type IDBCreateNewRoomData = {
  mapName: string;
  ownerId: string;
  ownerUsername: string;
}

export interface IDBManager {
  getAvailableMaps(): Promise<IMapPreview[]>; 
  createNewAccount(accountDetails: IApiUserCreateAccountRequest): Promise<IApiUserCreateAccountResponse>;
  createNewRoom(roomData: IDBCreateNewRoomData): Promise<IDBCreateNewRoomResult>
  getUserFromToken(token: string): Promise<string | undefined>
  getRoomsOfUser(userId: string): Promise<IDBGetRoomOfUserResponse> 
}
