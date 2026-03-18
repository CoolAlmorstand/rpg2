
import { io } from "socket.io-client"

const SERVERURL = import.meta.env.VITE_SERVER_URL

export const socket = io(`${SERVERURL}/room`) 

 
