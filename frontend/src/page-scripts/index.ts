


const multiplayerButton = document.getElementById("multiplayer-button")
const multiplayerDialog = document.getElementById("multiplayer-dialog") as HTMLDialogElement


multiplayerButton.addEventListener("click", () => {
  console.log("clicked")
  multiplayerDialog.showModal()
})

multiplayerDialog.addEventListener("click", (event) => {
  if(event.target == multiplayerDialog) {
    multiplayerDialog.close()
  }
})
