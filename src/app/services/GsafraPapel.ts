import { IGetGsafraPaperResponse } from "../../types/gsafraPaper";
import { api } from "./utils/api";

export class GsafraPapelService {
  static async getGsafraPapel(companyId: string) {
    const { data } = await api.get<IGetGsafraPaperResponse[]>(`/gsafra/papel`, {
      params: {
        companyId,
      },
    });

    return data;
  }
}
