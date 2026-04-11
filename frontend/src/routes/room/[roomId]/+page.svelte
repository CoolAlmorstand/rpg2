<script lang="ts">
  import { onMount } from "svelte"
  import { page } from "$app/state"
  import { sessionChatMessages, apppendToSessionChat } from "./state-stores"
  import type { ISocketManagerSendChatResult } from "./interface/ISocketManager.ts"
  import { SocketManager } from "./socket.ts"
  let roomId =  page.params.roomId 
  let ping = $state(20);  
  const socketManager = new SocketManager()

  type Tab = { id: string; label: string };
  const tabs: Tab[] = [
    { id: "players", label: "PLAYERS" },
    { id: "status",  label: "STATUS"  },
    { id: "chat",    label: "CHAT"    },
    { id: "map",     label: "MAP"     },
    { id: "items",   label: "ITEMS"   },
    { id: "quests",  label: "QUESTS"  },
  ];
  let activeTab = $state("players");

  // ── Players ──
  let activePlayers = $state([
    { name: "Aldric", ready: true  },
    { name: "Mira",   ready: false },
    { name: "Thorn",  ready: true  },
  ]);

  // ── Chat ──
  ;
  let chatInput = $state("");

  // ── Status ──
  let playerStatus = $state({ health: 80, hunger: 55, mana: 40 });

  // ── Derived ──
  let pingColor = $derived(ping < 60 ? "#4ade80" : ping < 120 ? "#facc15" : "#f87171");

  // ── Handlers ──
  function onBack() {
    // TODO: navigate back
    console.log("back");
  }

  function onEnterGame() {
    // TODO: enter game
    console.log("enter game");
  }
  
  async function switchTab(tabId: string) {
    console.log('a')
    if(tabId == "chat") {
      activeTab = tabId
      console.log('b')
      const getSessionChatsResults = await socketManager.getSessionChats()
      console.log(getSessionChatsResults)
      if(!getSessionChatsResults.success) {
        alert("failed to get chats")
        return
      }
      for(const chat of getSessionChatsResults.sessionChats) {
        apppendToSessionChat(chat.message, chat.sender, chat.indexOrder )
      }
    }
  }

  async function sendChat() {
    const trimmed = chatInput.trim();
    console.log(`try: ${trimmed}`)
    const sendChatResult: ISocketManagerSendChatResult = await socketManager.sendChat(trimmed)

    if(!sendChatResult.success) {
      alert(sendChatResult.error.reason)
      return
    }
    
    apppendToSessionChat(trimmed, sendChatResult.sender, sendChatResult.indexOrder)

    chatInput = "";
  }

  function handleChatKey(e: KeyboardEvent) {
    if (e.key === "Enter") sendChat();
  }

  onMount(async() => {
    const connectResult = await socketManager.connectAndJoinRoom(page.params.roomId!)

    if(!connectResult.success) {
      alert(`falied to join room: ${connectResult.error.reason} `)
    }
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
        aria-selected={activeTab === tab.id}
        class="snap-start shrink-0 bg-none border-none border-r border-[#c4a97a] border-b-[3px] px-[18px] py-[10px] font-['Micro_5'] text-base tracking-[2px] cursor-pointer transition-all whitespace-nowrap -mb-[2px] {activeTab === tab.id ? 'text-[#2a1f0e] bg-[#fdf8d4] border-b-[#7a5c3e]' : 'text-[#6b5840] border-b-transparent hover:bg-[#9B7653]/10 hover:text-[#2a1f0e]'}"
        onclick={() => switchTab(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- TAB CONTENT -->
  <div class="flex-1 overflow-hidden flex flex-col">

    {#if activeTab === "players"}
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

    {:else if activeTab === "status"}
      <div class="flex-1 flex flex-col p-[14px] overflow-y-auto gap-[10px] scrollbar-thin">
        <p class="font-['Micro_5'] text-[22px] tracking-[3px] text-[#6b5840] mb-[4px] shrink-0">PLAYER STATUS</p>
        <div class="flex flex-col gap-[16px]">
          <div class="flex items-center gap-[10px]">
            <span class="font-['Micro_5'] text-[22px] tracking-[1px] text-[#6b5840] w-[50px] shrink-0">HP</span>
            <div class="flex-1 h-[10px] bg-[#ede8b8] border border-[#9B7653] rounded-[5px] overflow-hidden">
              <div class="h-full rounded-[5px] transition-[width] duration-400 ease bg-[#f87171]" style="width:{playerStatus.health}%"></div>
            </div>
            <span class="font-['Micro_5'] text-[22px] text-[#6b5840] w-[24px] text-right">{playerStatus.health}</span>
          </div>
          <div class="flex items-center gap-[10px]">
            <span class="font-['Micro_5'] text-[22px] tracking-[1px] text-[#6b5840] w-[50px] shrink-0">HUNGER</span>
            <div class="flex-1 h-[10px] bg-[#ede8b8] border border-[#9B7653] rounded-[5px] overflow-hidden">
              <div class="h-full rounded-[5px] transition-[width] duration-400 ease bg-[#fb923c]" style="width:{playerStatus.hunger}%"></div>
            </div>
            <span class="font-['Micro_5'] text-[22px] text-[#6b5840] w-[24px] text-right">{playerStatus.hunger}</span>
          </div>
          <div class="flex items-center gap-[10px]">
            <span class="font-['Micro_5'] text-[22px] tracking-[1px] text-[#6b5840] w-[50px] shrink-0">MANA</span>
            <div class="flex-1 h-[10px] bg-[#ede8b8] border border-[#9B7653] rounded-[5px] overflow-hidden">
              <div class="h-full rounded-[5px] transition-[width] duration-400 ease bg-[#60a5fa]" style="width:{playerStatus.mana}%"></div>
            </div>
            <span class="font-['Micro_5'] text-[22px] text-[#6b5840] w-[24px] text-right">{playerStatus.mana}</span>
          </div>
        </div>
      </div>
    {:else if activeTab === "chat"}
      <div class="flex-1 flex flex-col p-[14px] overflow-y-auto gap-[10px] justify-between scrollbar-thin">
        <p class="font-['Micro_5'] text-[22px] tracking-[3px] text-[#6b5840] mb-[4px] shrink-0">CHAT</p>
        <div class="flex-1 overflow-y-auto flex flex-col gap-[6px] pb-[8px] scrollbar-thin">
          {#each $sessionChatMessages.filter(msg => msg != null) as msg}
            <div class="text-[14px] leading-[1.5]">
              <span class="font-['Micro_5'] text-[24px] text-[#7a5c3e] mr-[5px]">{msg.sender}:</span>
              <span class="text-[#2a1f0e]">{msg.message}</span>
            </div>
          {/each}
        </div>
        <div class="flex gap-[6px] shrink-0">
          <input
            class="flex-1 bg-[#ede8b8] border border-[#9B7653] rounded-[6px] px-[10px] py-[6px] font-['Pixelify_Sans'] text-[13px] text-[#2a1f0e] outline-none focus:border-[#7a5c3e]"
            bind:value={chatInput}
            onkeydown={handleChatKey}
            placeholder="say something..."
            maxlength="120"
          />
          <button class="bg-[#9B7653] border-none rounded-[6px] text-[#fdf8d4] text-[20px] px-[12px] py-[2px] cursor-pointer leading-none transition-colors hover:bg-[#7a5c3e]" onclick={sendChat}>›</button>
        </div>
      </div>

    {:else}
      <div class="flex-1 flex flex-col p-[14px] overflow-y-auto gap-[10px] justify-center items-center scrollbar-thin">
        <p class="font-['Micro_5'] text-[22px] tracking-[3px] text-[#6b5840] mb-[4px] shrink-0 uppercase">{activeTab}</p>
        <p class="font-['Micro_5'] text-[26px] tracking-[2px] text-[#c4a97a]">— coming soon —</p>
      </div>
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
