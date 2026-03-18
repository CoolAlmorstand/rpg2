
const maps = [
  {
    title: "Desert ARENA",
    description: "Open map with long sightlines.",
    image: "/maps/desert.jpg"
  },
  {
    title: "Forest Clash",
    description: "Tight spaces and ambush spots.",
    image: "/maps/forest.jpg"
  },
  {
    title: "Forest Clash",
    description: "Tight spaces and ambush spots.",
    image: "/maps/forest.jpg"
  }
];


const selectMapDialog = document.getElementById("select-map-dialog") as HTMLDialogElement

export function openSelectMapDialog() {
  selectMapDialog.showModal
  selectMapDialog.addEventListener("click", (event) => {
    if(event.target == selectMapDialog) {
      selectMapDialog.close()
    }
  })
} 




const template = document.getElementById("map-card-template") as HTMLTemplateElement
const container = document.getElementById("map-list");

function createMapCard(map) {
  const clone = template.content.cloneNode(true) as DocumentFragment;

  const image = clone.querySelector<HTMLImageElement>('[data-bind="image"]')!;
  const title = clone.querySelector<HTMLElement>('[data-bind="title"]')!;
  const description = clone.querySelector<HTMLElement>('[data-bind="description"]')!;
  const button = clone.querySelector<HTMLButtonElement>('[data-action="select"]')!;

  // assign values
  image.src = map.image;
  title.textContent = map.title;
  description.textContent = map.description;

  // behavior
  button.addEventListener("click", () => {
    console.log("Selected:", map.title);
  });

  return clone;
}

maps.forEach(map => {
  container.appendChild(createMapCard(map));
});
