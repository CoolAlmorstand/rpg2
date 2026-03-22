
import { createClient } from "@supabase/supabase-js"
import { IDBManager } from "../interfaces/IDBManager"
import { IMapPreview, IMapInfo, IUserCreateAccountRequest, IUserCreateAccountResponse } from "@terabithia/shared-types"

export class SupabaseManager implements IDBManager {
  supabase = createClient(
    "https://hlsdidxxakfbbsbryhdz.supabase.co",
    "sb_secret_ls1n6lBObntyfB0dNEzayQ_PJsPU3be"
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

  async createNewAccount(accountDetails: IUserCreateAccountRequest): Promise<IUserCreateAccountResponse> {
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


















