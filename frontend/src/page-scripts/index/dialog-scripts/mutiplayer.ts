

import type { ICreateGameData, IJoinRoomData } from "@terabithia/shared-types"

import { socket } from "../socket/socket-io"
import { createGameDialog } from "./create-game"

const createGameButton = document.getElementById("create-game-button")
const joinGameButton = document.getElementById("join-game-button")
const roomCodeInputField = document.getElementById("room-code-input-field") as HTMLInputElement

const SERVERURL = import.meta.env.VITE_SERVER_URL


export const multiplayerDialog = document.getElementById("multiplayer-dialog") as HTMLDialogElement


multiplayerDialog.addEventListener("click", (event) => {
  if(event.target == multiplayerDialog) {
    multiplayerDialog.close()
  }
})

createGameButton.addEventListener("click", async (event) => {
  multiplayerDialog.close()
  createGameDialog.showModal()

  // const response = await fetch(`${SERVERURL}/create-game`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "text/plain"
  //   },
  //   body: roomCodeInputField.value
  // }) 
  //
  // const data = await response.json()
   
})

joinGameButton.addEventListener("click", async () => {
  console.log(roomCodeInputField.value)
  const response = await fetch(`${SERVERURL}/rooms/check-if-room-exist`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: roomCodeInputField.value 

  })

  const data = await response.json()
  
  console.log(data)
  if(data.doesGameExist) {
    console.log("true")
    const testData: IJoinRoomData = { username: "jhone", roomId: "test-room-001" }
    socket.emit("join-room", testData)
  }
})

