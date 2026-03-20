
import { multiplayerDialog } from "./dialog-scripts/mutiplayer" 

const SERVERURL = import.meta.env.VITE_SERVER_URL

const multiplayerButton = document.getElementById("multiplayer-button")

multiplayerButton.addEventListener("click", () => {
  console.log("clicked")
  multiplayerDialog.showModal()
})


if(!sessionStorage.getItem("terabithia:account-details")) {
  window.location.href = "/create-account.html"
}


