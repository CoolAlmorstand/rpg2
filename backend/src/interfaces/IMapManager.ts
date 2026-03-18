
import { IMapPreview } from "@terabithia/shared-types";
import { ISupabaseManager } from "./ISupabaseManager";


export interface IMapManager {
  supabaseManager: ISupabaseManager;
  getAvailableMaps(): Promise<IMapPreview[]>; 

}
