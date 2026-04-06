<script lang="ts">
  import type { IAPIJoinRoomResponse } from "@terabithia/shared-types";

  const SERVERURL = import.meta.env.VITE_SERVER_URL;

  const { onjoined } = $props<{
    onjoined?: (roomName: string, roomId: string, ownerUsername: string) => void;
  }>();

  let dialog: HTMLDialogElement;
  let roomIdInput = $state('');
  let status = $state<'form' | 'loading' | 'success' | 'error'>('form');
  let errorMessage = $state('');

  export function open() {
    roomIdInput = '';
    status = 'form';
    errorMessage = '';
    dialog.showModal();
  }

  export function close() {
    dialog.close();
  }

  async function handleJoin() {
    if (!roomIdInput.trim()) {
      status = 'error';
      errorMessage = "Please enter a Room ID";
      return;
    }
    status = 'loading';
    try {
      const response = await fetch(`${SERVERURL}/rooms/join-room`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: roomIdInput }),
      });

      const data: IAPIJoinRoomResponse = await response.json();
      if(data.success) {
        status = 'success';
        if (onjoined) {
          onjoined(data.roomName, roomIdInput, data.ownerUsername);
        }
      } else {
        status = 'error';
        // The shared type says error is {}, so we'll provide a default message
        errorMessage = "Room not found or could not join.";
      }
    } catch (e) {
      status = 'error';
      errorMessage = "Connection error. Please try again later.";
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="w-full h-full flex flex-col justify-center items-center bg-transparent border-none outline-none backdrop:bg-black/40"
>
  <div
    class="w-4/5 flex flex-col gap-4 px-9 py-7 border-[3px]"
    style="background:#fdf8d4; border-color:#9B7653; box-shadow:4px 4px 0px #9B7653;"
  >
    {#if status === 'form'}
      <span
        class="text-xl tracking-wide"
        style="font-family:'Pixelify Sans',monospace; color:#9B7653;"
      >
        Join Room
      </span>

      <div class="flex flex-col gap-1">
        <label
          class="text-lg tracking-widest"
          style="font-family:'Micro 5',monospace; color:#9B7653;"
        >
          ROOM ID
        </label>
        <input
          type="text"
          bind:value={roomIdInput}
          maxlength="100"
          autocomplete="off"
          placeholder="Enter room ID here"
          class="w-full px-3 py-2 border-[2px] bg-transparent outline-none"
          style="font-family:'Pixelify Sans',monospace; color:#9B7653; border-color:#9B7653;"
        />
      </div>

      <div class="flex gap-3 justify-end">
        <button
          onclick={close}
          class="px-5 py-2 border-[2px] tracking-widest text-md"
          style="font-family:'Micro 5',monospace; color:#9B7653; border-color:#9B7653;"
        >
          CANCEL
        </button>
        <button
          onclick={handleJoin}
          class="px-5 py-2 border-[2px] tracking-widest text-md"
          style="font-family:'Micro 5',monospace; background:#9B7653; color:#fdf8d4; border-color:#9B7653; box-shadow:2px 2px 0px #7a5c3a;"
        >
          JOIN
        </button>
      </div>
    {:else if status === 'loading'}
      <div class="flex flex-col items-center justify-center gap-3">
        <img
          class="w-12 h-12 animate-spin"
          src="/ui-sprites/Untitled133_20260319181527.png"
          alt="loading"
        />
        <span
          class="text-lg tracking-wide"
          style="font-family:'Pixelify Sans',monospace; color:#9B7653;"
        >
          Joining Room...
        </span>
      </div>
    {:else if status === 'success'}
      <div class="flex flex-col items-center justify-center gap-3">
        <span
          class="text-lg tracking-wide"
          style="font-family:'Pixelify Sans',monospace; color:#9B7653;"
        >
          Joined Room Successfully!
        </span>
        <button
          onclick={close}
          class="px-5 py-2 border-[2px] tracking-widest text-md mt-2"
          style="font-family:'Micro 5',monospace; background:#9B7653; color:#fdf8d4; border-color:#9B7653; box-shadow:2px 2px 0px #7a5c3a;"
        >
          OK
        </button>
      </div>
    {:else if status === 'error'}
      <div class="flex flex-col items-center justify-center gap-3 text-center">
        <span
          class="text-lg tracking-wide"
          style="font-family:'Pixelify Sans',monospace; color:#9B7653;"
        >
          Error Joining Room
        </span>
        <span
          class="text-xl tracking-widest opacity-70"
          style="font-family:'Micro 5',monospace; color:#9B7653;"
        >
          {errorMessage}
        </span>
        <button
          onclick={close}
          class="px-5 py-2 border-[2px] tracking-widest text-md mt-2"
          style="font-family:'Micro 5',monospace; background:#9B7653; color:#fdf8d4; border-color:#9B7653; box-shadow:2px 2px 0px #7a5c3a;"
        >
          OK
        </button>
      </div>
    {/if}
  </div>
</dialog>
