
import { IActiveRoom } from "./IActiveRoom";

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

export type IRoomJoinActiveRoomResult = {
  success: true,
  ownerUsername: string;
  roomName: string;
  memberUsers: { username: string, id: string }[];
} | {
  success: false;
  error: {reason: string}
}

export type IRoomStartRoomSessionResult = {
  success: true;
} | {
  success: false;
  error: {reason: string}
}

export interface IRoomManager {
  activeRooms: Record<string, IActiveRoom>
  getRoomsOfUser(userId: string): Promise<IRoomGetRoomsOfUserResult>
  joinRoom(userId: string, roomId: string): Promise<IRoomJoinRoomResult>
  joinActiveRoom(userId: string, roomId: string ): Promise<IRoomJoinActiveRoomResult>;
  startRoomSessionResult(roomId: string): Promise<IRoomStartRoomSessionResult>;
  checkIfRoomExist(roomId: string): boolean;
  createNewRoom(roomData: IRoomCreateRoomData): Promise<IRoomCreateNewRoomResult>
}
