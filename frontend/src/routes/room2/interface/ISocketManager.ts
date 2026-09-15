
import type { Emitter } from "mitt"


export type ISocketManagerConnectResult = {
  success: true;
} | {
  success: false;
  error: {reason: string};
}

export type ISocketManagerSendChatResult = {
  success: true;
  indexOrder: number;
  sender: string;
} | {
  success: false;
  error: {reason: string}
}

export type getSessionChatsResult = {
  success: true;
  sessionChats: {sender: string; message: string; indexOrder: number;}[];
} | {
  success: false;
  error: {reason: string}
}


export type ISocketManagerEventTypes = {
  "chat-receive": {sender: string, message: string, indexOrder: number}
  "player-leave": {username: string}, 
  "new-player-join": { username: string }
}

export type ISocketManagerGetActivePlayersResult = {username: string}[]

export interface ISocketManager {
  event: Emitter<ISocketManagerEventTypes>
  getActivePlayers(): Promise<ISocketManagerGetActivePlayersResult>
  getSessionChats(): Promise<getSessionChatsResult>;
  sendChat(message: string): Promise<ISocketManagerSendChatResult>;
  connectAndJoinRoom(roomId: string): Promise<ISocketManagerConnectResult>;
}
