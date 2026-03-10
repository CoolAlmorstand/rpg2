import { Assets, Container, Sprite, Text } from "pixi.js";
// import bookCoverImage from "../../assets/ui-sprites/UI_TravelBook_BookCover01a.png"
import buttonImage from "../../../assets/ui-sprites/UI_TravelBook_FrameSelect01a.png"



async function loadElement(){
  const buttonContainer = new Container({
    layout: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    } 
  })
  
  const buttonImageLoadedTexuture = await Assets.load(buttonImage)
  const buttonSprite = new Sprite({
    texture: buttonImageLoadedTexuture,
    layout: {
      width: 100,
      height: 30
    }
  })

  const text = new Text({
    text: "Play",
    layout: {
      position: "absolute"
    },
    style: {
      fontFamily: "Pixelify",
      align: "center",
      fill: "white",
      fontSize: 20
    }
  })

  buttonContainer.addChild(buttonSprite)
  buttonContainer.addChild(text)
  return buttonContainer 
}



export default loadElement 


