

export type ISocketResponse<IResponse> = (response: IResponse) => void

export * from "./socket-io/room.ts"
export * from "./socket-io/shared.ts"
export * from "./api/maps.ts"
export * from "./api/room.ts"
export * from "./api/user.ts"

