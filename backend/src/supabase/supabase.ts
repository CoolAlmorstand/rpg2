
import { createClient, PostgrestError } from "@supabase/supabase-js"
import { IDBManager, IDBRoomRow, IDBRoomMemberRow, IDBGetRoomOfUserResponse, IDBIsUserAMemberOfRoomResult, IDBCreateNewRoomData, IDBCreateNewRoomResult, IDBJoinUserToRoomResult, IDBGetRoomFromIdResult, IDBGetMembersOfRoomResult } from "../interfaces/IDBManager"
import { IMapPreview, IMapInfo, IApiUserCreateAccountRequest, IApiUserCreateAccountResponse } from "@terabithia/shared-types"


export class SupabaseManager implements IDBManager {
  supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  
  )

  constructor() {

  }

  async getAvailableMaps() {
    const availableMaps: IMapPreview[] = []
    const {data, error} = await this.supabase.storage.from("Maps").list()
    
    if(error) {
     throw new Error(error.message) 
    }

    for(const mapFolder of data ) {
      const mapId = mapFolder.name
      const {data: infoBlob} = await this.supabase.storage.from("Maps").download(`${mapId}/info.json`)  
      const infoRawText = await infoBlob!.text()
      const info = JSON.parse(infoRawText) as IMapInfo
      
      const { data: imageBlob } = await this.supabase.storage.from("Maps").download(`${mapId}/thumbnail.png`)
      const imageArrayBuffer = await imageBlob!.arrayBuffer()
      const imageBase64String = Buffer.from(imageArrayBuffer).toString("base64")

      const mapPreview: IMapPreview = {
        title: info.title,
        description: info.description,
        thumbnail: imageBase64String
      }

      availableMaps.push(mapPreview)
    } 

    return availableMaps 
  }
  
  async isUserAMemberOfRoom(userId: string, roomId: string): Promise<IDBIsUserAMemberOfRoomResult> {
    const {data, error} = await this.supabase.from("room_members").select<"user_id", {user_id: string}>("user_id").eq("user_id", userId).eq("room_id", roomId).single() 
    if(error) {
      return {success: false, error: {reason: error.message}}
    }
    return {success: true}
  }

  async getMembersOfRoom(roomId: string): Promise<IDBGetMembersOfRoomResult> {
    const {data, error} = await this.supabase.from("room_members").select<"user_id", { user_id: string } >("user_id").eq("room_id", roomId)
    
    if(error) {
      return {
        success: false,
        error: {reason: error.message}
      }
    }

    const memberUsersArray = await Promise.all(
      data.map(async ( {user_id} ) => {
        const {data: userData} = await this.supabase.auth.admin.getUserById(user_id)
        return userData.user
      })
    )

    const members = {}
    for(const member of memberUsersArray ) {
      if(!member) { continue }
      members[member.id] = {
        username: member.user_metadata.username,
        id: member.id
      }
    }

    return {
      success: true,
      members 
    } 
  }

  async getUserFromToken(token: string): Promise<string | undefined> {
    const { data } = await this.supabase.auth.getUser(token) 
    return data.user?.id 
  }
  
  async joinUserToRoom(userId: string, roomId: string): Promise<IDBJoinUserToRoomResult> {
    const { error } = await this.supabase.from("room_members").insert([{
      user_id: userId,
      room_id: roomId
    }])

    if(error) {
      return {
        success: false,
        error: {reason: error.message}
      }
    }
    return { success: true }
  }
  
  async getRoomFromId(roomId: string): Promise<IDBGetRoomFromIdResult> {
    const {data, error} = await this.supabase.from("rooms").select("*").eq("id", roomId).single<IDBRoomRow>() 

    if(error) {
      return {
        success: false,
        error: {reason: error.message}
      }
    }

    return {
      success: true,
      room: data
    }
  }

  async getRoomsOfUser(userId: string): Promise<IDBGetRoomOfUserResponse> {
    const { data, error } = await this.supabase.from("room_members").select<"*", IDBRoomMemberRow>("*").eq("user_id", userId)   
    
    if(error){
      console.warn(error)
      return {
        success: false,
        error: {reason: error.message}
      }
    }
    else {
      const rooms = await Promise.all(
        data.map(async (roomMember) => {
          const { data } = await this.supabase.from("rooms").select("name, owner_id, owner_name, id").eq("id", roomMember.room_id).single<IDBRoomRow>()
          return data
        })
      )
      return {
        success: true,
        rooms: rooms.filter(x => x != null),
      }
    }
  }
  async createNewRoom(roomData: IDBCreateNewRoomData): Promise<IDBCreateNewRoomResult> {
    const {data, error} = await this.supabase.from("rooms").insert([{
      owner_id: roomData.ownerId,
      owner_name: roomData.ownerUsername,
      name: roomData.roomName
    }]).select("id").single<{ id: string }>()
    
    if(error) {
      return {
        success: false,
        error: {reason: error.message}
      }
    }
    return {
      success: true,
      roomId: data.id
    }
  }
  async createNewAccount(accountDetails: IApiUserCreateAccountRequest): Promise<IApiUserCreateAccountResponse> {
    const {error} = await this.supabase.auth.signUp({
      email: `${accountDetails.username}@terabithia.com`,
      password: accountDetails.password,
      options: {
        data: {
          username: accountDetails.username
        }
      }
    })

    if(error) {
      return {
        success: false,
        error: {reason: error.message}
      }
    } else {
      return {
        success: true
      }
    }
  }  
}


















