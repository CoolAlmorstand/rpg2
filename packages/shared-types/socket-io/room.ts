



export type ISocketRoomSendChatRequest = {
  message: string;
}


export type ISocketRoomSendChatResponse = {
  success: true;
  indexOrder: number;
  //username of sender
  sender: string;
} | {
  success: false;
  error: {reason: string}
}

export type ISocketJoinRoomRequest = {
  roomId: string;
}



export type ISocketRoomReceiveChat = {
  indexOrder: number;
  message: string;
  sender: string;
}

export type ISocketJoinRoomResponse = {
  success: true;
  //array of usernames
  activePlayers: string[];
  
} | {
  success: false;
  error: {reason: string};
}

