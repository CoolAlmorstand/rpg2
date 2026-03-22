import { resolve } from "node:dns";
import { ISessionToken } from "../interfaces/IAuthHandler";


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve => resolve(), ms))
}



export class SessionToken implements ISessionToken {
  totalLife: number;
  username: string;
  remainingLife: number;
  token: string;
  private timer: NodeJS.Timeout | null;

  constructor(totalLife: number, username: string) {
    this.totalLife = totalLife
    this.remainingLife = totalLife
    this.username = username
    this.token = crypto.randomUUID()
  }

  async startExpireTimer(callback: Function): Promise<void> {

    this.cancelTimer()

    this.timer = setInterval(() => {
      this.remainingLife -= 1 
      if(this.remainingLife <= 0 ) {
        callback()
        this.cancelTimer()
      }
    }, 1000)
  }
  
  cancelTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  
  resetExpireTimer(): void {
    this.remainingLife = this.totalLife
  }
}
