

import { IMapPreview } from "@terabithia/shared-types";
import { IMapManager } from "../interfaces/IMapManager.ts";
import { ISupabaseManager } from "../interfaces/ISupabaseManager.ts";



export class MapsManager implements IMapManager {
  supabaseManager: ISupabaseManager;
  constructor(supabaseManager: ISupabaseManager ) {
    this.supabaseManager = supabaseManager
  }

  async getAvailableMaps(): Promise<IMapPreview[]> {
   return this.supabaseManager.getAvailableMaps() 
  }
}
