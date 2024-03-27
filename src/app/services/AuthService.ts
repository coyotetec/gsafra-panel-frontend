import {
  IResetPasswordPayload,
  IResetPasswordResponse,
  ILoginData,
  ILoginResponse,
  IRequestResetResponse,
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

  static async resetPassword(payload: IResetPasswordPayload) {
    const { data } = await api.post<IResetPasswordResponse>(
      '/auth/password',
      payload,
    );

    return data;
  }

  static async requestReset(email: string) {
    const { data } = await api.post<IRequestResetResponse>(
      '/auth/request-reset',
      { email },
    );

    return data;
  }
}
