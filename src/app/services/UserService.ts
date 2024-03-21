import {
  GetUsersResponseType,
  PostUserResponseType,
  UserRoleType,
  UserStatusType,
} from '../../types/users';
import { api } from './utils/api';

interface ICreateUserArgs {
  name: string;
  email: string;
  role: UserRoleType | undefined;
  externalId?: number | undefined;
  companyId?: string | undefined;
}

export class UserService {
  static async getUsers() {
    const { data } = await api.get<GetUsersResponseType[]>('/users');

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

  static async createUser(payload: ICreateUserArgs) {
    const { data } = await api.post<PostUserResponseType>('/users', payload);

    return data;
  }
}
