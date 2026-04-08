import type { IAuthHandler } from "../../interfaces/auth/IAuthHandler";
import type { ISocketAuthMiddleware } from "../../interfaces/socket-io/middlerware/auth";
import type { Socket } from "socket.io"
import type { ISocketDataOnHandshake } from "@terabithia/shared-types";
import type { ExtendedError } from "socket.io";
import cookie from "cookie"

export function createSocketAuthMiddleware(authHandler: IAuthHandler): ISocketAuthMiddleware {

  async function validateToken(socket: Socket, next: (error?: ExtendedError) => void): Promise<void> {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie ?? "")
      // const accessToken = cookies["access-token"]
      const accessToken = undefined
      const validateResult = await authHandler.validateToken(accessToken)
      console.log(validateResult)
      if(validateResult.success) {
        const socketData: ISocketDataOnHandshake = {
          user: {
            username: validateResult.username,
            id: validateResult.userId
          }
        }
        socket.data = socketData 
        next()
      }
      else {
        next(new Error("unauthorized"))
      }
    }
    catch(error) {
      next(error)
    }
  }

  return {validateToken}
}
