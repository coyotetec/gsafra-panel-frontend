import { api } from './utils/api';
import {
  ICompanyPayload,
  ICompanyStatusResponse,
  ICreateCompanyResponse,
  IGetCompanyResponse,
} from '../../types/company';

export class CompanyService {
  static async getCompanies() {
    const { data } = await api.get<IGetCompanyResponse[]>('/companies');

    return data;
  }

  static async createCompany(payload: ICompanyPayload) {
    const { data } = await api.post<ICreateCompanyResponse>('/companies', {
      name: payload.name,
      host: payload.host,
      externalId: payload.code,
    });

    return data;
  }

  static async updateCompany(id: string, payload: ICompanyPayload) {
    const { data } = await api.put<ICreateCompanyResponse>(`/companies/${id}`, {
      name: payload.name,
      host: payload.host,
      externalId: payload.code,
    });

    return data;
  }

  static async activateCompany(id: string) {
    const { data } = await api.patch<ICompanyStatusResponse>(
      `/companies/${id}/activate`,
    );

    return data;
  }

  static async inactivateCompany(id: string) {
    const { data } = await api.delete<ICompanyStatusResponse>(
      `/companies/${id}`,
    );

    return data;
  }
}
