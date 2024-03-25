import {
  ICreateUserResponse,
  IGetUserResponse,
  IUserPayload,
  IUserStatusResponse,
  UserRoleType,
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
    const { data } = await api.get<IGetUserResponse[]>('/users');

    return data;
  }

  static async managerCreateUser(payload: IUserPayload | IUserPayload[]) {
    if (Array.isArray(payload)) {
      const { data } = await api.post<ICreateUserResponse[]>(
        '/users',
        payload.map((item) => ({
          name: item.name,
          email: item.email,
          role: item.userRole?.value,
          companyId: item.company?.id,
          externalId: item.gsafraUser?.id,
        })),
      );

      return data;
    } else {
      const { data } = await api.post<ICreateUserResponse>('/users', {
        name: payload.name,
        email: payload.email,
        role: payload.userRole?.value,
        companyId: payload.company?.id,
        externalId: payload.gsafraUser?.id,
      });

      return data;
    }
  }

  static async managerUpdateUser(id: string, payload: IUserPayload) {
    const { data } = await api.put<ICreateUserResponse>(`/users/${id}`, {
      name: payload.name,
      email: payload.email,
      role: payload.userRole?.value,
      companyId: payload.company?.id,
      externalId: payload.gsafraUser?.id,
    });

    return data;
  }

  static async activateUser(id: string) {
    const { data } = await api.patch<IUserStatusResponse>(
      `/users/${id}/activate`,
    );

    return data;
  }

  static async inactivateUser(id: string) {
    const { data } = await api.delete<IUserStatusResponse>(`/users/${id}`);

    return data;
  }

  static async createUser(payload: ICreateUserArgs) {
    const { data } = await api.post<ICreateUserResponse>('/users', payload);

    return data;
  }
}
