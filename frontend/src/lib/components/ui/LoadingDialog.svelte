
<script lang="ts">

  const {
    message,
    subMessage
  } = $props()

  let imageSrc: string = "/ui-sprites/Untitled133_20260319181527.png";
  let dialog: HTMLDialogElement;

  export function open() {
    dialog.showModal();
  }

  export function close() {
    dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  class="w-full h-full flex flex-col justify-center items-center bg-transparent border-none outline-none backdrop:bg-black/40"
>
  <div
    class="w-4/5 flex flex-col items-center justify-center gap-3 px-9 py-7 border-[3px] "
    style="background:#fdf8d4; border-color:#9B7653; box-shadow:4px 4px 0px #9B7653;"
  >
    <img
      class="w-12 h-12 animate-spin"
      src={imageSrc}
    />
    <span
      class="text-lg tracking-wide"
      style="font-family:'Pixelify Sans',monospace; color:#9B7653;"
    >
      {message}
    </span>
    <span
      class="text-xl tracking-widest opacity-70"
      style="font-family:'Micro 5',monospace; color:#9B7653;"
    >
      {subMessage}
    </span>
  </div>
</dialog>
