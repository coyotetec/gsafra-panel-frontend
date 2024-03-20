import { ILoginData, ILoginResponse } from '../../types/authentication';
import { api } from './utils/api';

export class AuthService {
  static async login({ email, password }: ILoginData) {
    const { data } = await api.post<ILoginResponse>('/auth/login', {
      email,
      password,
    });

    return data;
  }
}
