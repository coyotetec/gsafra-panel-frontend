import { IGetCompanyResponse } from "./company";
import { IGetGsafraUserResponse } from "./gsafraPaper";

export type UserRoleType = "ADMIN" | "USER" | "MANAGER";

export interface IUserDataAuthenticated {
  id: string;
  name: string;
  role: UserRoleType;
}

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

export interface IPutUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  externalId: number;
  active: boolean;
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
  company?: IGetCompanyResponse;
  gsafraUser?: IGetGsafraUserResponse;
  name: string;
  email: string;
  idPapel?: {
    ID: string;
  };
}

export interface ICreateUserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  idPapel: string;
  active: boolean;
  externalId: number;
}
