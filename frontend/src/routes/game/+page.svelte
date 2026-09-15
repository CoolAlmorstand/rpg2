
<script lang="ts">
  import { MapRenderer } from "$lib/renderer/map-renderer/map-renderer";
  import { Renderer } from "$lib/renderer/renderer"
  import { TerrainGenerator, TestTerrainGenerator} from "@terabithia/terrain-generator" 
  import { loadTilesets } from "$lib/renderer/tileset-loader/tileset-loader";
  import * as PIXI from "pixi.js"
  import { onMount } from "svelte";

  let container: HTMLDivElement
  
  async function initPixi(parentContainer: HTMLDivElement, app: PIXI.Application) {
    await app.init({
      background: "#FF0000",
      resizeTo: container, 
      autoStart: false,
    })
  }
  
  onMount(async() => { 

    const screenSize = {width: container.clientWidth, height: container.clientHeight}

    const pixiApp = new PIXI.Application()
    await initPixi(container, pixiApp)
    const terrainGenerator = new TerrainGenerator("hello", 16)
    const groundTileSprites = await loadTilesets()
    const mapRenderer = new MapRenderer(pixiApp.renderer, terrainGenerator, groundTileSprites, 16, 16, screenSize )
    const renderer = new Renderer(pixiApp, mapRenderer, screenSize)

    await mapRenderer.init()
    await renderer.init(container)

    renderer.renderMap()
    // mapRenderer.moveAndZoomMap(0, 0, -0.5)
    renderer.startRenderLoop() 
  })
</script>


<div class="flex felx-col justify-center items-center w-full h-full p-2 box-border bg-[#fdf8d4]">
  <div bind:this={container} class="flex felx-col justify-center items-center w-full h-full">

  </div>
</div>

