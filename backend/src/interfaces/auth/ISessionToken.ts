
export interface ISessionToken {
  username: string;
  totalLife: number;
  remainingLife: number;
  token: string;
  startExpireTimer(callback: Function): Promise<void>;
  resetExpireTimer(): void; 
}
