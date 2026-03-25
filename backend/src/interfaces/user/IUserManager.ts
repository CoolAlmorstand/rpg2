
export type IUserCreateAccountRequest = {
  username: string;
  password: string;
}

export type IUserCreateAccountResponse = {
  success: true; 
} | {
  success: false;
  error: { reason: string };
}

export type IUserLoginRequest = {
  username: string;
  password: string;
}

export type IUserLoginResponse = {
  success: true;
  token: string;
  username: string;
} | {
  success: false;
  error: { reason: string };
}

export interface IUserManager {
  createNewAccount(accountDetails: IUserCreateAccountRequest): Promise<IUserCreateAccountResponse>;
  accountLogin(credentials: IUserLoginRequest): Promise<IUserLoginResponse>;
}
