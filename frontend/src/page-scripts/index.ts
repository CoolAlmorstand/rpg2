
const SERVERURL = import.meta.env.VITE_SERVER_URL

const multiplayerButton = document.getElementById("multiplayer-button")
const multiplayerDialog = document.getElementById("multiplayer-dialog") as HTMLDialogElement
const createGameButton = document.getElementById("create-game-button")
const joinGameButton = document.getElementById("join-game-button")
const roomCodeInputField = document.getElementById("room-code-input-field") as HTMLInputElement

multiplayerButton.addEventListener("click", () => {
  console.log("clicked")
  multiplayerDialog.showModal()
})

multiplayerDialog.addEventListener("click", (event) => {
  if(event.target == multiplayerDialog) {
    multiplayerDialog.close()
  }
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
})
