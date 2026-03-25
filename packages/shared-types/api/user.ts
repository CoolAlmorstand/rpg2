

export type IApiUserCreateAccountRequest = {
  username: string;
  password: string;
}

export type IApiUserCreateAccountResponse = {
  success: true;
} | {
  success: false;
  error: {reason: string}
}


export type IApiUserLoginRequest = {
  username: string;
  password: string;
}

export type IApiUserLoginResponse = {
  success: true;
  username: string;
} | {
  success: false;
  error: {reason: string}
}


