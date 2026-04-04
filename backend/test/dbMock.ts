import { IDBManager, IGetRoomOfUserResponse } from "../src/interfaces/IDBManager";


export class DBMock implements IDBManager {
  constructor() {}

  async getRoomsOfUser(userId: string): Promise<IGetRoomOfUserResponse> {
    return {
      success: true,
      rooms: [
        {
          name: "room1",
          ownerUsername: "owner1",
          owner_id: "owner_id1",
          id: "1"
        },
        {
          name: "room2",
          ownerUsername: "owner2",
          owner_id: "owner_id1",
          id: "2"
        },
        {
          name: "room3",
          ownerUsername: "owner3",
          owner_id: "owner_id1",
          id: "3"
        },
        {
          name: "room4",
          ownerUsername: "owner4",
          owner_id: "owner_id1",
          id: "4"
        },
        {
          name: "room5",
          ownerUsername: "owner5",
          owner_id: "owner_id1",
          id: "5"
        },
        {
          name: "room6",
          ownerUsername: "owner6",
          owner_id: "owner_id1",
          id: "6"
        }, 
      ] 
    }
  }
}
