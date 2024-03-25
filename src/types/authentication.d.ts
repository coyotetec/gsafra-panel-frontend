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

export interface ICreatePasswordPayload {
  userId: string;
  password: string;
}

export interface ICreatePasswordResponse {
  message: string;
}
