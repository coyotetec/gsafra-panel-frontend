import { IGetUserCompaniesResponse } from '../../types/userCompanies';
import { api } from './utils/api';

export class UserCompanyService {
  static async getCompaniesByUserId(userId: string) {
    const { data } = await api.get<IGetUserCompaniesResponse>(
      `/users/${userId}/companies`,
    );
    return data;
  }
}
