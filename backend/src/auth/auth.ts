
import { IUserCreateAccountRequest, IUserLoginResponse } from "@terabithia/shared-types";
import { SessionToken } from "./session-token.ts";
import type { IAuthHandler, ISessionToken } from "../interfaces/IAuthHandler.ts";
import type { SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

export class SupabaseAuthHandler implements IAuthHandler {

  supabase: SupabaseClient;
  sessionTokens: {}
  constructor( supabase: SupabaseClient) {
    this.supabase = supabase
  }

  validateToken(token: string): boolean {
    if(this.sessionTokens[token]) {
      return true
    } else {
      return false
    }
  } 

  async userLogin(credentials: IUserCreateAccountRequest): Promise<IUserLoginResponse> {
    const {error} = await this.supabase.auth.signInWithPassword({
      email: `${credentials.username}@terabithia.com`,
      password: credentials.password
    }) 

    if(error) {
      return {
        success: false,
        error: {reason: error.message}
      } 
    } 
    else {
      const sessionToken = new SessionToken(120,credentials.username)
      sessionToken.startExpireTimer(() => this.tokenExpire(sessionToken))

      this.sessionTokens[sessionToken.token] = sessionToken

      return {
        success: true,
        token: sessionToken.token
      }
    }
  }

  tokenExpire(sessionToken: ISessionToken) {
    delete this.sessionTokens[sessionToken.token]
  }
}
