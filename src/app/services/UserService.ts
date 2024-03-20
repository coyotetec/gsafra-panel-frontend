import { IGetUsersResponse, UserStatusType } from '../../types/users';
import { api } from './utils/api';

export class UserService {
  static async getUsers() {
    const { data } = await api.get<IGetUsersResponse[]>('/users');

    return data;
  }

  static async activateUser(id: string) {
    const { data } = await api.patch<UserStatusType>(`/users/${id}/activate`);

    return data;
  }

  static async inactivateUser(id: string) {
    const { data } = await api.delete<UserStatusType>(`/users/${id}`);

    return data;
  }
}
