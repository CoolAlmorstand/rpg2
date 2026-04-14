


<script lang="ts">
  import { onMount } from "svelte"
  import { page } from "$app/state"
  import { goto } from "$app/navigation"

  import Chats from "./tabs/Chats.svelte";
  import Players from "./tabs/Players.svelte";

  import { SocketManager } from "./socket.ts"
  
  type IRoomConnectionStatus = "connected" | "connecting" | "reconnecting" | "disconnected" 

  const tabs: string[] = [
    "players",
    "chats",
    "status",
    "inventory",
    "map",
  ] 

  let roomId = $derived(page.url.searchParams.get("roomId")) 
  let activeTab = $derived(page.url.searchParams.get("tab"));
  let connectionStatus = $state<IRoomConnectionStatus>("disconnected")
  let ping = $state(20);  
  let pingColor = $derived(ping <= 20 ? "green" : "orange") 
  const socketManager = new SocketManager()
 
  function onBack() {
    // TODO: navigate back
    console.log("back");
  }

  function onEnterGame() {
    // TODO: enter game
    console.log("enter game");
  }
  
  async function switchTab(newTab: string) {
    goto(`/room2?roomId=${roomId}&tab=${newTab}`, {replaceState: true})    
  }

  onMount(async() => {
    connectionStatus = "connecting"
    const connectResult = await socketManager.connectAndJoinRoom(roomId!)

    if(!connectResult.success) {
      alert(`falied to join room: ${connectResult.error.reason} `)
      connectionStatus = "disconnected"
    }
    
    connectionStatus = "connected"
  })
</script>

<div class="flex flex-col min-h-dvh bg-[#fdf8d4] text-[#2a1f0e] font-['Pixelify_Sans'] overflow-hidden [background-image:repeating-linear-gradient(0deg,transparent,transparent_28px,rgba(155,118,83,0.06)_28px,rgba(155,118,83,0.06)_29px)]">

  <!-- TOP BAR -->
  <div class="flex items-center gap-[10px] px-[12px] pt-[10px] pb-[8px] border-b-2 border-[#9B7653] bg-[#fdf8d4] shrink-0">
    <button class="bg-none border-2 border-[#9B7653] rounded-[6px] text-[#7a5c3e] text-[26px] leading-none px-[8px] pb-[4px] pt-[1px] cursor-pointer transition-colors hover:bg-[#ede8b8] font-['Pixelify_Sans']" onclick={onBack} aria-label="Back">&#8249;</button>

    <div class="flex-1 border-2 border-[#9B7653] rounded-[6px] flex items-center gap-[8px] px-[12px] py-[4px] bg-[#ede8b8]">
      <span class="font-['Micro_5'] text-xl text-[#6b5840] tracking-[2px]">ROOM</span>
      <span class="font-['Micro_5'] text-xl text-[#2a1f0e] tracking-[3px]">{roomId}</span>
    </div>

    <div class="flex flex-col items-center gap-[2px] min-w-[40px]" title="Ping: {ping}ms">
      <div class="w-[16px] h-[16px] rounded-full transition-all duration-400" style="background:{pingColor}; box-shadow:0 0 8px {pingColor}"></div>
      <span class="text-xs transition-colors duration-400" style="color:{pingColor}">{ping}ms</span>
    </div>
  </div>

  <!-- TAB BAR -->
  <div class="flex overflow-x-auto snap-x snap-mandatory border-b-2 border-[#9B7653] bg-[#ede8b8] shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
    {#each tabs as tab}
      <button
        role="tab"
        aria-selected={activeTab === tab}
        class="snap-start shrink-0 bg-none border-none border-r border-[#c4a97a] border-b-[3px] px-[18px] py-[10px] font-['Micro_5'] text-base tracking-[2px] cursor-pointer transition-all whitespace-nowrap -mb-[2px] {activeTab === tab ? 'text-[#2a1f0e] bg-[#fdf8d4] border-b-[#7a5c3e]' : 'text-[#6b5840] border-b-transparent hover:bg-[#9B7653]/10 hover:text-[#2a1f0e]'}"
        onclick={() => switchTab(tab)}
      >
        {tab}
      </button>
    {/each}
  </div>

  <!-- TAB CONTENT -->
  <div class="flex-1 overflow-hidden flex flex-col">
    
    {#if connectionStatus != "connected"}
      <div class="w-full h-full flex flex-col items-center justify-center">
        <span class="font-['Micro_5'] text-xl text-[#6b5840] tracking-[2px]">{connectionStatus}</span>
      </div>
    {:else if activeTab === "players"}
      <Players /> 
    {:else if activeTab === "status"}
      
    {:else if activeTab === "chats"}
      <Chats socketManager={socketManager} />
    {:else}
      
    {/if}

  </div>

  <!-- BOTTOM BAR -->
  <div class="px-[12px] pt-[10px] pb-[12px] border-t-2 border-[#9B7653] bg-[#fdf8d4] shrink-0">
    <button class="w-full p-[12px] bg-[#2a1f0e] text-[#fdf8d4] font-['Micro_5'] text-2xl tracking-[4px] border-2 border-[#2a1f0e] rounded-[6px] cursor-pointer transition-colors hover:bg-[#7a5c3e] hover:border-[#7a5c3e] active:translate-y-[1px]" onclick={onEnterGame}>ENTER GAME</button>
  </div>

</div>

<style>
  .scrollbar-thin::-webkit-scrollbar { width: 4px; }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #c4a97a;
    border-radius: 4px;
  }
</style>
