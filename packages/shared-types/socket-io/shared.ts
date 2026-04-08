
export type ISocketError = {
  reason: string;
}

export type ISocketDataOnHandshake = {
  user: {
    username: string;
    id: string;
  }
}
