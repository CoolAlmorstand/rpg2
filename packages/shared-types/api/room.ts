



export type IAPICreateRoomData = {
  mapName: string;
}


export type ICreateRoomResponse = {
  success: true;
} | {
  success: false;
  error: {reason: string};
}


export type IAPIGetRoomsOfUserResponse = {
  success: true;
  rooms: { name: string, ownerUsername: string, roomId: string }[];
} | {
  success: false;
  error: { reason: string };
}
