






export type IUserCreateAccountRequest = {
  username: string;
  password: string;
}

export type IUserCreateAccountResponse = {
  success: true;
} | {
  success: false;
  error: {reason: string}
}


export type IUserLoginRequest = {
  username: string;
  password: string;
}

export type IUserLoginResponse = {
  success: true;
  username: string;
  token: string;
} | {
  success: false;
  error: {reason: string}
}


