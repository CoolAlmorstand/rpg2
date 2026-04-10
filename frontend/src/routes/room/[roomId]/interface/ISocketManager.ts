


export type ISocketManagerConnectResult = {
  success: true;
  activePlayers: string[];
} | {
  success: false;
  error: {reason: string};
}

export type ISocketManagerSendChatResult = {
  success: true;
  timeSent: string;
} | {
  success: false;
  error: {reason: string}
}

export interface ISocketManager {
  sendChat(message: string): Promise<ISocketManagerSendChatResult>;
  connectAndJoinRoom(roomId: string): Promise<ISocketManagerConnectResult>;
}
