

<script lang="ts">

  import { ISocketManager } from "../interface/ISocketManager"; 

  const { socketManager }: {
    socketManager: ISocketManager 
  } = $props()

  const activePlayers = $state([
    {name: "mildred"},
    {name: "jake"},
    {name: "iahra"}
  ])

  socketManager.on
</script>

<div class="flex-1 flex flex-col p-[14px] overflow-y-auto gap-[10px] scrollbar-thin">
  <p class="font-['Micro_5'] text-[22px] tracking-[3px] text-[#6b5840] mb-[4px] shrink-0">ACTIVE PLAYERS</p>
  <ul class="list-none m-0 p-0 flex flex-col gap-[8px]">
    {#each activePlayers as p}
      <li class="flex items-center gap-[8px] px-[10px] py-[8px] border border-[#9B7653] rounded-[6px] bg-[#ede8b8]">
        <span class="w-[8px] h-[8px] rounded-full shrink-0" style="background:{p.ready ? '#4ade80' : '#6b7280'}"></span>
        <span class="flex-1 text-[15px]">{p.name}</span>
        <span class="font-['Micro_5'] text-[20px] tracking-[1px] text-[#6b5840]">{p.ready ? "ready" : "waiting"}</span>
      </li>
    {/each}
  </ul>
</div>
