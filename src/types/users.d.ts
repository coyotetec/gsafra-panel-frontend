export type UserRoleType = 'ADMIN' | 'USER' | 'MANAGER';

export interface IGetUsersResponse {
  id: string;
  name: string;
  email: string;
  role: UserRoleType;
  externalId: number;
  active: boolean;
  companies: {
    id: string;
    name: string;
  }[];
}

export type UserStatusType = { message: string };
