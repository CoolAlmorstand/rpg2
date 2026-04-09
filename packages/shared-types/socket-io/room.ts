



export type ISocketRoomSendMessageRequest = {
  message: string;
}


export type ISocketJoinRoomRequest = {
  roomId: string;
}

export type ISocketJoinRoomResponse = {
  success: true;
} | {
  success: false;
  error: {reason: string};
}

