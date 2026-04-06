
import type { IGame } from "./IGame";

export type IRoomGetRoomsOfUserResult = {
  success: true;
  rooms: {name: string; ownerUsername: string, roomId: string }[];
} | {
  success: false;
  error: { reason: string }
}

export type IRoomCreateRoomData = {
  roomName: string;
  ownerId: string;
  ownerUsername: string;
}


export type IRoomCreateNewRoomResult = {
  success: true;
  roomId: string;
} | {
  success: false;
  error: { reason: string };
}

export type IRoomJoinRoomResult = {
  success: true,
  ownerUsername: string;
  roomName: string;
} | {
  success: false;
  error: {reason: string}
}

export interface IRoomManager {
  rooms: Record<string, IGame>
  getRoomsOfUser(userId: string): Promise<IRoomGetRoomsOfUserResult>
  joinRoom(userId, roomId): Promise<IRoomJoinRoomResult>
  checkIfRoomExist(roomId: string): boolean;
  createNewRoom(roomData: IRoomCreateRoomData): Promise<IRoomCreateNewRoomResult>
}
