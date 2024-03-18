import { AxiosError } from 'axios';
import { IGetUsersResponse, UserStatusType } from '../../types/users';
import { localStorageKeys } from '../config/localStorageKeys';
import { APIError } from '../errors/APIError';
import { api } from './utils/api';

export class UserService {
  static async getUsers() {
    try {
      const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
      const { data } = await api.get<IGetUsersResponse[]>('/users', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          throw new APIError('Não foi possível encontrar os usuários');
        }

        if (err.response?.status === 500) {
          throw new APIError(
            'Problemas no servidor, tente novamente mais tarde',
          );
        }
      }
    }
  }

  static async activateUser(id: string) {
    try {
      const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
      const { data } = await api.patch<UserStatusType>(
        `/users/${id}/activate`,
        null,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          throw new APIError(err.response.data.error);
        }

        if (err.response?.status === 500) {
          throw new APIError(
            'Problemas no servidor, tente novamente mais tarde',
          );
        }
      }
    }
  }

  static async inactivateUser(id: string) {
    try {
      const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
      const { data } = await api.delete<UserStatusType>(`/users/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          throw new APIError(err.response.data.error);
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
