import { IGetUserResponse } from '../../types/users';

export function orderUsersByCompany(users: IGetUserResponse[]) {
  const usersToOrder = [...users];

  return usersToOrder.sort((a, b) => {
    const companiesA = a.companies
      .map((company) => company.name)
      .sort()
      .join(',');
    const companiesB = b.companies
      .map((company) => company.name)
      .sort()
      .join(',');

    if (companiesA < companiesB) {
      return -1;
    }

    if (companiesA > companiesB) {
      return 1;
    }

    return 0;
  });
}
