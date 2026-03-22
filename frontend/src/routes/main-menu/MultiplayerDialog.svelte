



<script lang="ts">
  import type { ICreatRoomData, ICreateRoomResponse } from "@terabithia/shared-types";
  import type { ILocalAccountDetials } from "../../interfaces/localAccountDetails"
  import { getLocalAccountDetails } from "$lib/account"
 
  import { goto } from "$app/navigation"

  export function open() {
    dialogElement.showModal()
  }
  
  export function close() {
    dialogElement.close()
  }

  let dialogElement: HTMLDialogElement
 
  const SERVERURL = import.meta.env.VITE_SERVER_URL


  function backdropClick(event: MouseEvent) {
    if(event.target == dialogElement) {
      dialogElement.close()
    }
  }

  async function createGame() {

    const accountDetails: ILocalAccountDetials = getLocalAccountDetails() 
    
    if(!accountDetails) {
      const answer = confirm("youre not logged in do you wanna log in?")
      if(answer) {
        goto("/")
      }
      return
    }
    
    const createRoomData: ICreatRoomData = {
      owner: accountDetails.username,
      authToken: accountDetails.authToken,
      isPublic: false
    }
    const response = await fetch(`${SERVERURL}/rooms/create-room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createRoomData)
    }) 

    const responseData: ICreateRoomResponse = await response.json()

    console.log(responseData)
  }
</script>



<dialog onclick={(event) => backdropClick(event)} bind:this={dialogElement} class="h-full w-full flex flex-row items-center justify-center"> 
  <div class="flex flex-col gap-5 items-center box-border p-3 bg-[#fdf8d4] rounded-xl w-8/10 "> 
    <p class="text-[#9B7653] text-3xl font-bold font-['Pixelify_Sans']"> Multiplayer </p>

    <div class="w-full h-px bg-[#9B7653]"></div>

    <div class="flex flex-col gap-5 items-center">
      <button onclick={createGame} class="w-40 bg-[#9B7653] text-white py-2 px-3 rounded-md font-['Pixelify_Sans'] font-medium "> Create Game </button>

      <div class="w-full h-px bg-[#9B7653]"></div>
      <input id="room-code-input-field" placeholder="Enter Room Code" class="w-39 text-center outline-none px-2 py-2 text-[#9B7653] border-[#9B7653] border-1 font-['Pixelify_Sans'] rounded-md" type="text" />
      <button id="join-game-button" class="w-40 border-1 border-[#9B7653] text-[#9B7653] py-2 px-3 rounded-md font-['Pixelify_Sans'] font-medium "> Join Game </button>
    </div>  
  </div>
</dialog>
