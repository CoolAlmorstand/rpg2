
import type { Namespace } from "socket.io"
import type { Socket } from "socket.io"

export interface IRoomSocket { 
  connectedUsers: Record<Socket,>   
}
