import { Assets } from "pixi.js";
import { NineSliceSprite } from "@pixi/layout/components";
// import bookCoverImage from "../../assets/ui-sprites/UI_TravelBook_BookCover01a.png"
import bookCoverImage from "../../../assets/ui-sprites/travel-book-large-corners.png"



async function loadElement(){
  const bookCoverLoadedTexuture = await Assets.load(bookCoverImage)
  const bookPanel = new NineSliceSprite({
    texture: bookCoverLoadedTexuture,
    leftWidth: 32,
    rightWidth: 32,
    topHeight: 32,
    bottomHeight: 32,
    layout: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 10,
      position: "absolute",
      width: "90%",
      height: 400
    }
  })
  return bookPanel
}



export default loadElement 


