
import loadBookPanel from "./book-panel"
import loadPlayButton from "./play-button" 
import { ScrollBox } from "@pixi/ui"


export async function construckBookPanel(){ 
  const bookPanel = await loadBookPanel()

  const contentContainer = new ScrollBox({
    width: bookPanel.layoutResult?.width,
    height: bookPanel.layoutResult?.height
  })
  const playButton = await loadPlayButton() 


  contentContainer.addChild(playButton)
  bookPanel.addChild(contentContainer)
  return bookPanel
}
