export type UserRoleType = 'ADMIN' | 'USER' | 'MANAGER';

export interface IGetUsersResponse {
  active: boolean;
  email: string;
  externalId: number;
  id: string;
  name: string;
  role: UserRoleType;
}
