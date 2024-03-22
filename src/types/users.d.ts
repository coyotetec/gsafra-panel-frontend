import { IGetCompanyReponse } from './company';
import { IGetGsafraUserResponse } from './gsafraUser';

export type UserRoleType = 'ADMIN' | 'USER' | 'MANAGER';

export interface IGetUserResponse {
  id: string;
  name: string;
  email: string;
  active: boolean;
  externalId: number;
  role: UserRoleType;
  companies: {
    id: string;
    name: string;
  }[];
}

export interface IUserStatusResponse {
  message: string;
}

export interface IUserRole {
  value: string;
  label: string;
}

export interface IUserPayload {
  userRole?: IUserRole;
  company?: IGetCompanyReponse;
  gsafraUser?: IGetGsafraUserResponse;
  name: string;
  email: string;
}

export interface ICreateUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  active: boolean;
  externalId: number;
}
