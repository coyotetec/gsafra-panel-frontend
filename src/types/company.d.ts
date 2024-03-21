export interface IGetCompanyReponse {
  id: string;
  name: string;
  externalId: string;
  usersQty: number;
  active: boolean;
}

interface ICompanyPayload {
  name: string;
  code: string;
}

interface ICreateCompanyResponse {
  id: string;
  name: string;
  externalId: string;
  active: boolean;
}

export interface ICompanyStatusResponse {
  message: string;
}
