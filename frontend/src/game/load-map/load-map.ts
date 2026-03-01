

const serverUrl = import.meta.env



export async function getAvailableMaps() {
  const response = await fetch(`${serverUrl}/maps/get-available`)
  const availableMaps = await response.json()

  console.log(availableMaps)
}



