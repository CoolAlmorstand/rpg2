

<script lang="ts">
  import messageIcon from "$lib/assets/message-icon.png"
  import type { ISocketManager } from "../interface/ISocketManager.ts"; 
  import { onMount } from "svelte"


  const { socketManager }: {
    socketManager: ISocketManager 
  } = $props()

  let activePlayers: {username: string}[] = $state([
  ])

  socketManager.event.on("new-player-join", (data) => {
    activePlayers.push(data)
  })

  socketManager.event.on("player-leave", (data) => {
    for(let i = 0; i < activePlayers.length; i++) {
      const player = activePlayers[i]
      if(player.username == data.username) {
        activePlayers.splice(i, 1)
      }
    }
  })

  onMount( async() => {
    activePlayers = await socketManager.getActivePlayers()
  })

</script>

<div class="flex-1 flex flex-col p-[14px] overflow-y-auto gap-[10px] scrollbar-thin">
  <p class="font-['Micro_5'] text-[22px] tracking-[3px] text-[#6b5840] mb-[4px] shrink-0">ACTIVE PLAYERS</p>
  <ul class="list-none m-0 p-0 flex flex-col gap-[8px]">
    {#each activePlayers as p}
      <li class="flex items-center gap-[8px] px-[10px] py-[8px] border border-[#9B7653] rounded-[6px] bg-[#ede8b8]">
        <span class="flex-1 text-[15px]">{p.username}</span>
        <img class="max-w-6" src={messageIcon} />
      </li>
    {/each}
  </ul>
</div>
