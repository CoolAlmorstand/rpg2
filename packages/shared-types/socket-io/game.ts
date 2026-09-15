
import type { DefaultEventsMap } from "socket.io";

export type IGameSocketEventsFromClient = {
  "": (
    data: {}, 
    ack: (
      response: ISocketRoomGetSessionChatsResponse
    ) => void
  ) => void; 
}

export type getGameDataReq = {

}

export type IGameSocketGetActivePlayersOfRoomResponse = {username: string}[]

export type IRoomSocketEventsFromServer = {
  "receive-chat": (data: ISocketRoomReceiveChat) => void;
  "new-player-join": (data: ISocketRoomNewPlayerJoin) => void;
}

export type IRoomSocketDataOnHandshake = {
  user: {username: string, id: string}
}

export type IGameSocket = Socket<
  IGameSocketEventsFromClient,
  IRoomSocketEventsFromServer, 
  DefaultEventsMap,
  IRoomSocketDataOnHandshake
>
