
<script lang="ts">
  import { MapRenderer } from "$lib/renderer/map-renderer/map-renderer";
  import { Renderer } from "$lib/renderer/renderer"
  import { TerrainGenerator } from "../../../../packages/terrain-generator/index.ts" 
  import * as PIXI from "pixi.js"
  import { onMount } from "svelte";

  let container: HTMLDivElement
  
  onMount(async() => {
    const screenSize = {width: container.clientWidth, height: container.clientHeight}

    const pixiApp = new PIXI.Application()

    const terrainGenerator = new TerrainGenerator("hello", 16)
    const mapRenderer = new MapRenderer(pixiApp.renderer, terrainGenerator, 16, 16, screenSize )
    const renderer = new Renderer(pixiApp, mapRenderer, screenSize)

    await mapRenderer.init()
    await renderer.init(container)

    renderer.renderMap()
    renderer.mapRenderer.zoomMap(-0.2)
    renderer.startRenderLoop() 
  })
</script>


<div class="flex felx-col justify-center items-center w-full h-full p-2 box-border bg-[#fdf8d4]">
  <div bind:this={container} class="flex felx-col justify-center items-center w-full h-full">

  </div>
</div>

