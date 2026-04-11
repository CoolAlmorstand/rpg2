



export type ISocketRoomSendChatRequest = {
  message: string;
}

export type ISocketRoomGetSessionChatsResponse = {
  success: true;
  sessionChats: {sender: string; message: string; indexOrder: number}[];
} | {
  success: false;
  error: {reason: string};
}


//for potential feture use
export type ISocketRoomGetSessionChatsRequest = {
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

