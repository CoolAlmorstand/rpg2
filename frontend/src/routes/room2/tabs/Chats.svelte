


<script lang="ts">
  import { onMount } from "svelte"
  import type { ISocketManager } from "../interface/ISocketManager"

  const { socketManager } : {
    socketManager: ISocketManager
  } = $props()

  const sessionChats: {sender: string; message: string, indexOrder: number}[] = $state([])
  let chatInput: string = $state("") 
 
  function appendToSessionChats(chats: {sender: string; message: string, indexOrder: number}[]) {
    for(const chat of chats) {
      sessionChats.splice(chat.indexOrder, 0, chat)
    }
  }
  
  socketManager.event.on("chat-receive", (data) => {
    appendToSessionChats([data])
  })

  async function sendChat() {
    const message  = chatInput
    const sendChatResult = await socketManager.sendChat(message) 
    if(sendChatResult.success) {
      appendToSessionChats( [{ sender: sendChatResult.sender, message, indexOrder: sendChatResult.indexOrder }] )    
    }
    chatInput = ""
  }

  function handleChatKey(event: KeyboardEvent) {
    if(event.key == "Enter") {
      sendChat()
    }
  }

  onMount(async() => {
    const getAllChatsResult = await socketManager.getSessionChats() 
    if(!getAllChatsResult.success) {
      alert(getAllChatsResult.error.reason)
      return
    }
   
    appendToSessionChats(getAllChatsResult.sessionChats)
    
  })

</script>
<div class="flex-1 flex flex-col p-[14px] overflow-y-auto gap-[10px] justify-between scrollbar-thin">
  <p class="font-['Micro_5'] text-[22px] tracking-[3px] text-[#6b5840] mb-[4px] shrink-0">CHAT</p>
  <div class="flex-1 overflow-y-auto flex flex-col gap-[6px] pb-[8px] scrollbar-thin">
    {#each sessionChats.filter(msg => msg != null) as msg}
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
