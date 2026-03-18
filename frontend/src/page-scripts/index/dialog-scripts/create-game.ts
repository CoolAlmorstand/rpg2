
import isPublicToggleOffImage from "../../../assets/ui-sprites/UI_TravelBook_ButtonValue01a.png"
import isPublicToggleOnImage from "../../../assets/ui-sprites/UI_TravelBook_ButtonValue01b.png"
import { openSelectMapDialog } from "./select-map"

export const createGameDialog = document.getElementById("create-game-dialog") as HTMLDialogElement


let isPublic = false
const isPublicToggle = document.getElementById("is-public-toggle")
const isPublickToggleText = document.getElementById("is-public-toggle-text")
const isPublicToggleIconElement = document.getElementById("is-public-toggle-icon") as HTMLImageElement

const createRoomButton = document.getElementById("create-room-button")
const selectMapButton = document.getElementById("select-map-button")

createGameDialog.addEventListener("click", (event) => {
  if(event.target == createGameDialog) {
    createGameDialog.close()
  } 
})


isPublicToggle.addEventListener("click", () => {
  if(isPublic) {
    isPublicToggleIconElement.src = isPublicToggleOffImage
    isPublickToggleText.textContent = "PRIVATE"
    isPublic = false
  } else {
    isPublicToggleIconElement.src = isPublicToggleOnImage
    isPublickToggleText.textContent = "PUBLIC"
    isPublic = true 
  }
})

selectMapButton.addEventListener("click", () => {
  createGameDialog.close()
  openSelectMapDialog()
})






