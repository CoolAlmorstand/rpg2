
import type { Socket } from "socket.io"
import type { NextFunction } from "express"
import type { ExtendedError } from "socket.io"

export interface ISocketAuthMiddleware {
  validateToken(socket: Socket, next: (error?: ExtendedError) => void ): Promise<void>
}
