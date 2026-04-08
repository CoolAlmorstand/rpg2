



export type IAPICreateRoomData = {
  roomName: string;
}

export type IAPICreateRoomResponse = {
  success: true;
  roomId: string;
  ownerUsername: string;
} | {
  success: false;
  error: {reason: string};
}


export type IAPIJoinRoom = {
  roomId: string
}

export type IAPIJoinRoomResponse = {
  success: true,
  ownerUsername: string,
  roomName: string;
} | {
  success: false;
  error: {}
}


export type IAPIGetRoomsOfUserResponse = {
  success: true;
  rooms: { name: string, ownerUsername: string, roomId: string }[];
} | {
  success: false;
  error: { reason: string };
}
