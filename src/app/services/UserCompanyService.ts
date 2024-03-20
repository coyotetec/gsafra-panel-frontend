import { IGetUserCompaniesResponse } from '../../types/userCompanies';
import { localStorageKeys } from '../config/localStorageKeys';
import { api } from './utils/api';

export class UserCompanyService {
  static async getCompaniesByUserId(userId: string) {
    try {
      const token = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
      const { data } = await api.get<IGetUserCompaniesResponse[]>(
        `/users/${userId}/companies`,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
