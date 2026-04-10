


import { writable } from "svelte/store";

export const chatMessages = writable<{time: string; username: string; message: string}[]>([
  { time: "o", username: "Mira",   message: "ready soon!" },
  { time: "p", username: "Aldric", message: "no rush"     },
])
