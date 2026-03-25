



export type ICreateRoomData = {
  pin: string | null;

  //usernameOfOwner
  owner: string;
  isPublic: boolean;
}


export type ICreateRoomResponse = {
  success: true;
} | {
  success: false;
  error: {reason: string};
}
