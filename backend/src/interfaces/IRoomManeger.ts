
import type { IGame } from "./IGame";

export interface IRoomManager {
  rooms: Record<string, IGame>
  checkIfRoomExist(roomId: string ): boolean;

}
