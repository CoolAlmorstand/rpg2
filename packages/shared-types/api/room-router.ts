



export interface ICreateRoomData {
  pin?: string;
  
  //usernameOfOwner
  owner: string;
  authToken: string;
  isPublic: boolean;
}


export interface ICreateRoomResponse {
  success: boolean;
  error?: {reason: string};
}
