
import { createClient } from "@supabase/supabase-js"
import { IDBManager } from "../interfaces/IDBManager"
import { IMapPreview, IMapInfo, IApiUserCreateAccountRequest, IApiUserCreateAccountResponse } from "@terabithia/shared-types"
import { ICreateRoomData } from "@terabithia/shared-types";

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
  
  async getUserFromToken(token: string): Promise<string | undefined> {
    const {data , error} = await this.supabase.auth.getUser(token) 
    return data.user?.id 
  }

  async createRoom(createRoomData: ICreateRoomData) {
    const { data, error } = await this.supabase.from("parties").insert({})
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


















