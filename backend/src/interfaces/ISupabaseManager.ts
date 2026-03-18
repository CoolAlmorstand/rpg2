
import { IMapPreview } from "@terabithia/shared-types"

export interface ISupabaseManager {
  getAvailableMaps(): Promise<IMapPreview[]>; 
}
