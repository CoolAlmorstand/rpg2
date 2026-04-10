



export type ISocketRoomSendChatRequest = {
  message: string;
}

export type ISocketRoomSendChatResponse = {
  success: true;
  indexOrder: number;
} | {
  success: false;
  error: {reason: string}
}

export type ISocketJoinRoomRequest = {
  roomId: string;
}

export type ISocketJoinRoomResponse = {
  success: true;
  //array of usernames
  activePlayers: string[];
  
} | {
  success: false;
  error: {reason: string};
}

