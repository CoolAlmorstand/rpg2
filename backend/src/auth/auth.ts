
import type { SupabaseClient } from "@supabase/supabase-js";
import type { IAuthHandler, IAuthUserLoginRequest, IAuthUserLoginResponse } from "../interfaces/auth/IAuthHandler";
import type { ISessionToken } from "../interfaces/auth/ISessionToken.ts";

import { SessionToken } from "./session-token.ts"

export class SupabaseAuthHandler implements IAuthHandler {

  supabase: SupabaseClient;
  sessionTokens: Record<string, ISessionToken> = {}
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
  
  async userLogin(credentials: IAuthUserLoginRequest): Promise<IAuthUserLoginResponse> {
    const {data, error} = await this.supabase.auth.signInWithPassword({
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
        token: sessionToken.token,
        username: data.user.user_metadata.username,
      }
    }   
  } 

  tokenExpire(sessionToken: ISessionToken) {
    delete this.sessionTokens[sessionToken.token]
  }
}
