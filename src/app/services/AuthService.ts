import {
  ICreatePasswordPayload,
  ICreatePasswordResponse,
  ILoginData,
  ILoginResponse,
} from '../../types/authentication';
import { api } from './utils/api';

export class AuthService {
  static async login({ email, password }: ILoginData) {
    const { data } = await api.post<ILoginResponse>('/auth/login', {
      email,
      password,
    });

    return data;
  }

  static async createPassword({ userId, password }: ICreatePasswordPayload) {
    const { data } = await api.post<ICreatePasswordResponse>(
      `/users/${userId}/password`,
      {
        password,
      },
    );

    return data;
  }
}
