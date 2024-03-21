import { useEffect, useMemo, useState } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { UserInformation } from '../components/UserInformation';
import { NewUserModal } from '../components/NewUserModal';
import { UserService } from '../../../../../app/services/UserService';
import { GetUsersResponseType } from '../../../../../types/users';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { SkeletonUsers } from '../../../../components/Loaders/SkeletonUsers';
import { UserCompanyService } from '../../../../../app/services/UserCompanyService';
import { useAuth } from '../../../../../app/hooks/useAuth';
import { IGetUserCompaniesResponse } from '../../../../../types/userCompanies';

export function Users() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [users, setUsers] = useState<GetUsersResponseType[] | null>(null);
  const [showUsers, setShowUsers] = useState<GetUsersResponseType[] | null>(
    null,
  );
  const [userCompanies, setUserCompanies] = useState<
    IGetUserCompaniesResponse[] | null
  >();
  const [selectedCompany, setSelectedCompany] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const filteredUsersByCompany = useMemo(() => {
    if (!users) return null;

    return users.filter(({ companies }) =>
      companies.some(({ id }) => id === selectedCompany),
    );
  }, [users, selectedCompany]);

  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true);
        const usersData = await UserService.getUsers();
        setUsers(usersData);
      } catch (err) {
        if (err instanceof APIError) {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    async function getUserCompanies(userId: string) {
      const userCompanies =
        await UserCompanyService.getCompaniesByUserId(userId);
      setSelectedCompany(userCompanies[0].id);
      setUserCompanies(userCompanies);
    }

    user && getUserCompanies(user.id);
  }, [user]);

  useEffect(() => {
    setShowUsers(filteredUsersByCompany);
  }, [filteredUsersByCompany]);

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>

      {userCompanies && userCompanies.length !== 0 ? (
        <select
          value={selectedCompany}
          className="w-1/2 bg-transparent text-sm text-gray-400 outline-none"
          onChange={({ target }) => setSelectedCompany(target.value)}
        >
          {userCompanies?.map(({ name, id }) => (
            <option className="text-black" value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
      ) : null}

      <div className="mt-6 flex flex-1 flex-col items-stretch gap-6">
        {isLoading ? (
          <SkeletonUsers />
        ) : (
          showUsers?.map(({ id, email, active, name }) => (
            <UserInformation
              key={id}
              email={email}
              userName={name}
              active={active}
              id={id}
            />
          ))
        )}

        {!showUsers || showUsers.length === 0 ? (
          <p className="text-sm text-gray-400">Não há usuários para exibir</p>
        ) : (
          ''
        )}
      </div>

      <Button variant="light" onClick={() => setShowNewUserModal(true)}>
        <IconUserPlus size={24} />
        Novo usuário
      </Button>
      <NewUserModal
        companies={userCompanies}
        visible={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
        updateUserState={setUsers}
      />
    </>
  );
}
