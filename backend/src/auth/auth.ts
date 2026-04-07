
import type { SupabaseClient } from "@supabase/supabase-js";
import type { IAuthHandler, IAuthUserLoginRequest, IAuthUserLoginResponse, IAuthValidateTokenResult, IRefreshTokenResult } from "../interfaces/auth/IAuthHandler";
import type { ISessionToken } from "../interfaces/auth/ISessionToken.ts";

import { SessionToken } from "./session-token.ts"
import { Request, Response, NextFunction } from "express";

export class SupabaseAuthHandler implements IAuthHandler {

  supabase: SupabaseClient;
  sessionTokens: Record<string, ISessionToken> = {}
  constructor( supabase: SupabaseClient) {
    this.supabase = supabase
  }
  
  async refreshToken(token: string): Promise<IRefreshTokenResult> {
    const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: token })
    if(error) {
     return {
        success: false,
        error: {reason: error.message}
      }
    }
    return {
      success: true,
      accessToken: data.session!.access_token,
      refreshToken: data.session!.refresh_token
    }
  }

  validateSocketToken(token: string): boolean {
    if(this.sessionTokens[token]) {
      return true
    } else {
      return false
    }
  } 
 
  async validateToken(token: string): Promise<IAuthValidateTokenResult> { 
    const { data, error} = await this.supabase.auth.getUser(token)
    if(error) {
      return {
        success: false,
        error: {reason: error.message}
      }
    }

    return {
      success: true,
      userId: data.user!.id,
      username: data.user!.user_metadata.username
    }
  }

  async vkalidateToken(token: string): Promise<void> {

    const { data, error} = await this.supabase.auth.getUser(token)
    if(error) { 
    }
    else {
      
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
      return {
        success: true,
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        username: data.user.user_metadata.username,
      }
    }   
  } 
}
