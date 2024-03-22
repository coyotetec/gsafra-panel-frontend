import { IGetGsafraUserResponse } from '../../types/gsafraUser';
import { api } from './utils/api';

export class GsafraUserService {
  static async getGsafraUsers(companyId: string) {
    const { data } = await api.get<IGetGsafraUserResponse[]>(
      `/gsafra/companies/${companyId}/users`,
    );

    return data;
  }
}
