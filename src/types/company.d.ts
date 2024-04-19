export interface IGetCompanyResponse {
  id: string;
  name: string;
  host: string;
  externalId: string;
  usersQty: number;
  active: boolean;
}

interface ICompanyPayload {
  name: string;
  host: string;
  code: string;
}

interface ICreateCompanyResponse {
  id: string;
  name: string;
  host: string;
  externalId: string;
  active: boolean;
}

export interface ICompanyStatusResponse {
  message: string;
}
