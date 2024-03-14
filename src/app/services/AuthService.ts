import { AxiosError } from 'axios';
import { ILoginData, ILoginResponse } from '../../types/authentication';
import { api } from './utils/api';
import { APIError } from '../errors/APIError';

export class AuthService {
  static async login({ email, password }: ILoginData) {
    try {
      const { data } = await api.post<ILoginResponse>('/auth/login', {
        email,
        password,
      });

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          const error = err.response.data.error as string;
          throw new APIError(error);
        }

        if (err.response?.status === 500) {
          throw new APIError(
            'Problemas no servidor, tente novamente mais tarde',
          );
        }
      }
    }
  }
}
