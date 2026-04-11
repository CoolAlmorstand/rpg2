


export type ISocketManagerConnectResult = {
  success: true;
  activePlayers: string[];
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

export interface ISocketManager {
  getSessionChats(): Promise<getSessionChatsResult>;
  sendChat(message: string): Promise<ISocketManagerSendChatResult>;
  connectAndJoinRoom(roomId: string): Promise<ISocketManagerConnectResult>;
}
