
import { createClient } from "@supabase/supabase-js"
import { ISupabaseManager } from "../interfaces/ISupabaseManager"
import { IMapPreview, IMapInfo } from "@terabithia/shared-types"


export class SupabaseManager implements ISupabaseManager {
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
}
