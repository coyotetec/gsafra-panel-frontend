export interface IGetUserCompaniesResponse {
  externalUserId: number;
  companies: {
    name: string;
    id: string;
    externalId: string;
  }[];
}
