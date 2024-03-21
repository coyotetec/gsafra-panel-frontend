export type UserRoleType = 'ADMIN' | 'USER' | 'MANAGER';

export type GetUsersResponseType = {
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
};

export type PostUserResponseType = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  externalId: number;
  role: UserRoleType;
  password: string | null;
};

export type UserStatusType = { message: string };
