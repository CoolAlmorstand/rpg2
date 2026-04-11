






export type IActiveRoom = {
  //string is userId
  connectedUsers: Record<string, {username: string; id: string}>; 
  //string is userId
  memberUsers: Record<string, {username: string; id: string}>;
  //user id as the key with the value as a message
  //later to be saved when the room session ends
  sessionChats: {sender: {username: string; id: string}, message: string, indexOrder: number;}[]; 

  roomName: string;
  ownerUsername: string;
  ownerId: string;
  id: string;
}
