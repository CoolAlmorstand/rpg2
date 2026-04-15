
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
  success: true;
} | {
  success: false;
  error: {reason: string}
}

export type IRoomStartRoomSessionResult = {
  success: true;
  activeRoom: IActiveRoom;
} | {
  success: false;
  error: {reason: string}
}

export type IRoomSendChatResult = {
  success: true;
  indexOrder: number;
} | {
  success: false;
  error: {reason: string}
}

export type IRoomSessionChats = {
  message: string;
  sender: {username: string; id: string};
  indexOrder: number;
}[]

export type IRoomGetActivePlayers = Record<string, {username: string; id: string}>
  

export interface IRoomManager {
  getActivePlayersOfRoom(roomId: string): IRoomGetActivePlayers; 
  getSessionChatsOfRoom(roomId: string): IRoomSessionChats; 
  kickPlayerFromActiveRoom(userId: string, roomId: string): void;
  sendChatToRoom(roomId: string, message: string, sender: {username: string; id: string}): Promise<IRoomSendChatResult>;
  activeRooms: Record<string, IActiveRoom>
  getActiveRoomOFUser(userId: string): string | null; 
  getRoomsOfUser(userId: string): Promise<IRoomGetRoomsOfUserResult>
  joinRoom(userId: string, username: string, roomId: string): Promise<IRoomJoinRoomResult>
  joinActiveRoom(userId: string, username: string, roomId: string ): Promise<IRoomJoinActiveRoomResult>;
  startRoomSession(roomId: string): Promise<IRoomStartRoomSessionResult>;
  checkIfRoomExist(roomId: string): boolean;
  createNewRoom(roomData: IRoomCreateRoomData): Promise<IRoomCreateNewRoomResult>
}
