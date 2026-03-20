



export type IAuthCreateAccountDetails = {
  username: string;
  password: string;
}

export interface IAuthLoginAttemptResponse {
  success: boolean;
  username?: string;
  error?: {reason: string};
  token?: string;
}
