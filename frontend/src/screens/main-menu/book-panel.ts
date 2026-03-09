import { Assets } from "pixi.js";
import { NineSliceSprite } from "@pixi/layout/components";
import bookCoverImage from "../../assets/ui-sprites/UI_TravelBook_BookCover01a.png"



async function loadElement(){
  const bookCoverLoadedTexuture = await Assets.load(bookCoverImage)
  const bookPanel = new NineSliceSprite({
    texture: bookCoverLoadedTexuture,
    leftWidth: 12,
    rightWidth: 12,
    topHeight: 12,
    bottomHeight: 12,
    layout: {
    }
  })
  bookPanel.scale.set(1.1,1.1)
  return bookPanel
}



export default loadElement 


