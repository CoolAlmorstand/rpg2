
import type { Emitter } from "mitt"


export type IRoomSocketManagerConnectResult = {
  success: true;
} | {
  success: false;
  error: {reason: string};
}

export type IRoomSocketManagerSendChatResult = {
  success: true;
  indexOrder: number;
  sender: string;
} | {
  success: false;
  error: {reason: string}
}

export type IRoomGetSessionChatsResult = {
  success: true;
  sessionChats: {sender: string; message: string; indexOrder: number;}[];
} | {
  success: false;
  error: {reason: string}
}


export type IRoomSocketManagerEventTypes = {
  "chat-receive": {sender: string, message: string, indexOrder: number}
  "player-leave": {username: string}, 
  "new-player-join": { username: string }
}

export type IRoomSocketManagerGetActivePlayersResult = {username: string}[]

export interface IRoomSocketManager {
  event: Emitter<IRoomSocketManagerEventTypes>
  getActivePlayers(): Promise<IRoomSocketManagerGetActivePlayersResult>
  getSessionChats(): Promise<IRoomGetSessionChatsResult>;
  sendChat(message: string): Promise<IRoomSocketManagerSendChatResult>;
  connectAndJoinRoom(roomId: string): Promise<IRoomSocketManagerConnectResult>;
}
