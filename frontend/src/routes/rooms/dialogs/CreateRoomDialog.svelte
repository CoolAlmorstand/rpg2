<script lang="ts">
  const SERVERURL = import.meta.env.VITE_SERVER_URL;

  const { oncreated } = $props<{
    oncreated?: (roomName: string) => void;
  }>();

  let dialog: HTMLDialogElement;
  let roomName = $state('');

  export function open() {
    roomName = '';
    dialog.showModal();
  }

  export function close() {
    dialog.close();
  }

  async function handleCreate() {
    await fetch(`${SERVERURL}/rooms/create-room`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: roomName }),
    });

    oncreated?.(roomName);
    close();
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
    <span
      class="text-xl tracking-wide"
      style="font-family:'Pixelify Sans',monospace; color:#9B7653;"
    >
      Create Room
    </span>

    <div class="flex flex-col gap-1">
      <label
        class="text-lg tracking-widest"
        style="font-family:'Micro 5',monospace; color:#9B7653;"
      >
        ROOM NAME
      </label>
      <input
        type="text"
        bind:value={roomName}
        maxlength="48"
        autocomplete="off"
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
        onclick={handleCreate}
        class="px-5 py-2 border-[2px] tracking-widest text-md"
        style="font-family:'Micro 5',monospace; background:#9B7653; color:#fdf8d4; border-color:#9B7653; box-shadow:2px 2px 0px #7a5c3a;"
      >
        CREATE
      </button>
    </div>
  </div>
</dialog>
