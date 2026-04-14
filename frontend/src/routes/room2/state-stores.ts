

import { get } from "svelte/store"
import { writable } from "svelte/store";

export function apppendToSessionChat(message: string, sender: string, indexOrder: number) {
  const messages = get(sessionChatMessages)
  
  if(indexOrder <= messages.length) {
    for(const message of messages) {
      if(!message) {
        continue
      }
      if(message.indexOrder >= indexOrder) {
        message.indexOrder ++
      }
    }
    messages.splice(indexOrder, 0 , {
      message,
      sender,
      indexOrder,
    })
  } 
  else {
    messages.splice(indexOrder, 0 , {
      message,
      sender,
      indexOrder,
    })
  }

  sessionChatMessages.update(() => messages)
}

export const staticChatMessages = writable<{username: string; message: string}[]>([
  { username: "Mira",   message: "ready soon!" },
  { username: "Aldric", message: "no rush"     },
])

export const sessionChatMessages = writable<({indexOrder: number; sender: string; message: string} | null)[]>([
])
