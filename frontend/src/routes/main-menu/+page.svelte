

<script lang="ts">
  import MultiplayerDialog from "./MultiplayerDialog.svelte";

  import Logo from "$lib/components/ui/Logo.svelte";

  let multiplayerDialogElement: MultiplayerDialog
 
</script>


<div class="w-full h-full pt-2 gap-2 bg-[#fdf8d4] overflow-hidden flex flex-col justify-start items-center">

  <Logo />

  <div class="bg-[url(/ui-sprites/UI_TravelBook_BookCover01a.png)] pixelated bg-stretch w-[90%] h-[200px] flex flex-row">
    <div class="h-full flex flex-col justify-center items-center gap-1 pb-3 w-1/2">
      <button class="font-['Micro_5'] text-[28px] w-1/2 flex flex-row justify-center items-center gap-1 bg-transparent border-none">
        Play
        <img class="w-2 h-2" src="/ui-sprites/UI_TravelBook_IconArrow01a.png"/>
      </button>
      <button class="font-['Micro_5'] text-[28px] w-1/2 flex flex-row justify-center items-center gap-1 bg-transparent border-none">
        Settings
        <img class="w-2 h-2" src="/ui-sprites/UI_TravelBook_IconGear01a.png"/>
      </button>
      <button onclick={() => multiplayerDialogElement.open()} class="font-['Micro_5'] text-[28px] w-1/2 flex flex-row justify-center items-center gap-1 bg-transparent border-none">
        Multiplayer
        <img class="w-2 h-2" src="/ui-sprites/UI_TravelBook_IconRestart01a.png"/>
      </button>
    </div>

    <div class="book-page-right flex flex-col justify-center items-center gap-1 box-border pb-2 px-2 pl-4 w-1/2 h-full">
      <p class="font-['Micro_5'] text-[22px] leading-none">Welcome to the best game ever made by the best most talendted dumfuck youve ever met</p>
    </div>
  </div>

  <MultiplayerDialog bind:this={multiplayerDialogElement} />
</div>
