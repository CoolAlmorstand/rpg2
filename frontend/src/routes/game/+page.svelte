
<script lang="ts">
  import { Renderer } from "$lib/renderer/renderer"
  // import { createMap } from "@terabithia/terrain-generator" 
  import { createMap } from "../../../../packages/terrain-generator/index.ts" 
  import { onMount } from "svelte";

  let container: HTMLDivElement
  const renderer = new Renderer()

  onMount(async() => {
    const map = createMap("hiiii", 144, 320)
    await renderer.init(container)
    await renderer.renderMap(map)
  })
</script>


<div class="flex felx-col justify-center items-center w-full h-full p-2 box-border bg-[#fdf8d4]">
  <div bind:this={container} class="flex felx-col justify-center items-center w-full h-full">

  </div>
</div>

