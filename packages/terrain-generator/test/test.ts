import { generateTilesOfChunk } from "../generate-tiles/generate-tiles";
import { IBlendingEdges } from "../types/types";


const t0 = performance.now()
const tiles = generateTilesOfChunk("hello", 16)

function check(ed: IBlendingEdges) {
  for(const a of Object.values(ed)){
    if(a) { return true}
  }
}

console.log(tiles.tileLayers)
for(const edd of tiles.blendingEdges) {
for(const ed of edd) {
  if(check(ed)) {
    console.log(ed)
  }
}
}
const t1 = performance.now(); console.log(t1 - t0, "ms")


