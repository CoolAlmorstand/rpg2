



export type ICreateRoomData = {
  pin: string | null;
  name: string;
  isPublic: boolean;
}


export type ICreateRoomResponse = {
  success: true;
} | {
  success: false;
  error: {reason: string};
}
