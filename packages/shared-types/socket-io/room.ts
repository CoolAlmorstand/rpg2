import { DefaultEventsMap, Socket } from "socket.io";

export type IRoomSocketEventsFromClient = {
  "get-session-chats": (
    data: {}, 
    ack: (
      response: ISocketRoomGetSessionChatsResponse
    ) => void
  ) => void;

  "join-room": (
    data: ISocketJoinRoomRequest, 
    ack: (
      res: ISocketJoinRoomResponse
    ) => void
  ) => void
  ;
  "send-message": (
    req: ISocketRoomSendChatRequest,
    ack: (
      res: ISocketRoomSendChatResponse
    ) => void
  ) => void;
}

export type IRoomSocketEventsFromServer = {
  "receive-chat": (data: ISocketRoomReceiveChat) => void;
  "new-player-join": (data: ISocketRoomNewPlayerJoin) => void;
}

export type IRoomSocketDataOnHandshake = {
  user: {username: string, id: string}
  roomId: string
}

export type IRoomSocket = Socket<
  IRoomSocketEventsFromClient,
  IRoomSocketEventsFromServer, 
  DefaultEventsMap,
  IRoomSocketDataOnHandshake
>

export type ISocketRoomNewPlayerJoin = {
  username: string
}

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

export type ISocketRoomOnPlayerJoin = {
  username: string
}

export type ISocketJoinRoomResponse = {
  success: true;
  //array of usernames
  activePlayers: string[];
  
} | {
  success: false;
  error: {reason: string};
}




