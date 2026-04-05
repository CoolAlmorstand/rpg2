
<script lang="ts">
  import type { IAPIGetRoomsOfUserResponse, IAPICreateRoomData } from "@terabithia/shared-types"
  import CreateRoomDialog from "./dialogs/CreateRoomDialog.svelte";
  import { onMount } from "svelte"
  import LoadingDialog from "$lib/components/ui/LoadingDialog.svelte";

  const SERVERURL = import.meta.env.VITE_SERVER_URL
  let rooms: {name: string; ownerUsername: string; roomId: string}[] = $state([])
  let loadingScreen: LoadingDialog;
  let createRoomDialog: CreateRoomDialog;

  onMount(async() => {
    loadingScreen.open()
    const response = await fetch(`${SERVERURL}/rooms/get-rooms-of-user`, {
      method: "GET",
      credentials: "include",
    })
    loadingScreen.close()
    const data: IAPIGetRoomsOfUserResponse = await response.json()
    if(data.success){
      rooms=data.rooms
    }
  }

  )
  async function createNewRoom() {
    createRoomDialog.open() 
  }
</script>

<div class="w-full h-full bg-[#fdf8d4] flex flex-col overflow-hidden">

  <!-- Header -->
  <div class="flex items-center justify-between px-4 pt-3 pb-2 border-b-2 border-[#9B7653]">
    <p class="font-['Micro_5'] text-[32px] text-[#9B7653] leading-none">ROOMS</p>
    <div class="flex gap-2">
      <button class="font-['Pixelify_Sans'] text-sm font-medium border border-[#9B7653] text-[#9B7653] px-3 py-1 rounded-md">
        Join
      </button>
      <button onclick={createNewRoom} class="font-['Pixelify_Sans'] text-sm font-medium bg-[#9B7653] text-white px-3 py-1 rounded-md">
        Create
      </button>
    </div>
  </div>

  <!-- Room list -->
  <div class="flex flex-col gap-3 p-4 overflow-y-auto">
    {#each rooms as room}
      <div class="flex items-center justify-between bg-white/40 border border-[#9B7653] rounded-xl px-4 py-3">
        <div class="flex flex-col gap-0.5">
          <p class="font-['Pixelify_Sans'] font-semibold text-[#9B7653] text-base leading-tight">{room.name}</p>
          <p class="font-['Pixelify_Sans'] text-xs text-[#9B7653]/70">{room.ownerUsername}</p>
        </div>
        <button class="font-['Pixelify_Sans'] text-sm font-medium bg-[#9B7653] text-white px-4 py-1.5 rounded-md">
          Play
        </button>
      </div>
    {/each}
  </div>
  <CreateRoomDialog bind:this={createRoomDialog} /> 
  <LoadingDialog bind:this={loadingScreen} message="Contacting Server" subMessage="Please wait" />
</div>
