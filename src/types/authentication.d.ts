export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: 'MANAGER' | 'ADMIN' | 'USER';
    externalId: number;
  };
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IResetPasswordPayload {
  userId: string;
  password: string;
  token?: string;
}

export interface IResetPasswordResponse {
  message: string;
}

export interface IRequestResetResponse {
  message: string;
}
