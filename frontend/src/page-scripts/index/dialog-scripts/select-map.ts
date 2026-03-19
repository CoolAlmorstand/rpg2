import type { IMapPreview } from "@terabithia/shared-types";

const SERVERURL = import.meta.env.VITE_SERVER_URL

const fetchingMapsTemplate = document.getElementById("fetching-maps-template") as HTMLTemplateElement
const template = document.getElementById("map-card-template") as HTMLTemplateElement
const container = document.getElementById("map-list") 
const fetchingMaps = document.createElement("div")
fetchingMaps.appendChild(fetchingMapsTemplate.content.cloneNode(true) as DocumentFragment)


const mockMaps: IMapPreview[] = [
  {
    title: "Crystal Caverns",
    description: "Explore glittering caves filled with hidden treasures and traps.",
    thumbnail: "iVBORw0KGgoAAAANSUhEUgAA...", // base64 string placeholder
    isLocked: false,
  },
  {
    title: "Sunset Valley",
    description: "A peaceful valley surrounded by mountains, perfect for beginners.",
    thumbnail: "iVBORw0KGgoAAAANSUhEUgAA...", // base64 string placeholder
  },
  {
    title: "Forgotten Ruins",
    description: "Navigate through ancient ruins full of secrets and enemies.",
    thumbnail: "iVBORw0KGgoAAAANSUhEUgAA...", // base64 string placeholder
    isLocked: true,
  },
  {
    title: "Skyward Isles",
    description: "Floating islands high above the clouds, challenging your platforming skills.",
    thumbnail: "iVBORw0KGgoAAAANSUhEUgAA...", // base64 string placeholder
    isLocked: false,
  },
  {
    title: "Molten Core",
    description: "A fiery dungeon with lava pits and aggressive enemies.",
    thumbnail: "iVBORw0KGgoAAAANSUhEUgAA...", // base64 string placeholder
    isLocked: true,
  },
];


export const selectMapDialog = document.getElementById("select-map-dialog") as HTMLDialogElement

export async function openSelectMapDialog() {
  selectMapDialog.showModal()
  selectMapDialog.addEventListener("click", (event) => {
    if(event.target == selectMapDialog) {
      selectMapDialog.close()
    }
  })
  container.innerHTML = ""
  container.appendChild(fetchingMaps)

  const availableMaps = await fetchAvailableMaps()
 
  container.removeChild(fetchingMaps)

  availableMaps.forEach(map => {
    container.appendChild(createMapCard(map));
  });
} 

async function fetchAvailableMaps() {
  console.log("sii")
  const response = await fetch(`${SERVERURL}/map/get-available-maps`, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain"
    },
    body: "skj" 

  })
  const data: IMapPreview[] = await response.json()
  
  return data.map( (mapPreview) => {
    return {
      title: mapPreview.title,
      description: mapPreview.description,
      thumbnail:`data:image/png;base64,${mapPreview.thumbnail}`
    }
  })
}


function createMapCard(map: IMapPreview) {
  const clone = template.content.cloneNode(true) as DocumentFragment;

  const image = clone.querySelector<HTMLImageElement>('[data-bind="image"]')!;
  const title = clone.querySelector<HTMLElement>('[data-bind="title"]')!;
  const description = clone.querySelector<HTMLElement>('[data-bind="description"]')!;
  const button = clone.querySelector<HTMLButtonElement>('[data-action="select"]')!;

  // assign values
  image.src = map.thumbnail;
  title.textContent = map.title;
  description.textContent = map.description;

  // behavior
  button.addEventListener("click", () => {
     selectMapDialog.dispatchEvent(new CustomEvent("map-selected", {
      detail: {mapName:  map.title }
    }))
  });

  return clone;
}
