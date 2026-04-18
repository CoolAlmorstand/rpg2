


export type ITerrainTypes = "grass" | "sand" | "water"
export type IMap = {type: ITerrainTypes}[][]

export interface IRenderer {
  init(container: HTMLDivElement): Promise<void>
  renderMap(map: IMap): Promise<void> 
}


