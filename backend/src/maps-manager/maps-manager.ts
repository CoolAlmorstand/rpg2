

import { IMapPreview } from "@terabithia/shared-types";
import { IMapManager } from "../interfaces/IMapManager.ts";
import type { IDBManager } from "../interfaces/IDBManager.ts";


export class MapsManager implements IMapManager {
  supabaseManager: IDBManager;
  constructor(supabaseManager: IDBManager ) {
    this.supabaseManager = supabaseManager
  }

  async getAvailableMaps(): Promise<IMapPreview[]> {
   return this.supabaseManager.getAvailableMaps() 
  }
}
