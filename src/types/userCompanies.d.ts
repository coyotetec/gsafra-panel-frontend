export interface IUserCompany {
  name: string;
  id: string;
  externalId: string;
  password: string;
}

export interface IGetUserCompaniesResponse {
  externalUserId: number[];
  userFirebirdId: number[];
  companies: IUserCompany[];
}
