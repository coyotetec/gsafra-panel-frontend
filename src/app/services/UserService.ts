import { IGetUsersResponse } from '../../types/users';
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
      throw new APIError('Problemas no servidor, tente novamente mais tarde');
    }
  }

  static async activateUser(id: string) {
    try {
      const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
      const { data } = await api.patch(`/users/${id}/activate`, null, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  static async inactivateUser(id: string) {
    try {
      const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
      const { data } = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
    }
  }
}
