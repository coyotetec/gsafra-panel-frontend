import { useEffect, useState } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { UserInformation } from '../components/UserInformation';
import { NewUserModal } from '../components/NewUserModal';
import { UserService } from '../../../../../app/services/UserService';
import { IGetUsersResponse } from '../../../../../types/users';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { SkeletonUsers } from '../../../../components/Loaders/SkeletonUsers';

export function Users() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [users, setUsers] = useState<IGetUsersResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true);
        const usersData = await UserService.getUsers();
        setUsers(usersData || null);
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

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>
      <div className="mt-6 flex flex-1 flex-col items-stretch gap-6">
        {isLoading ? (
          <SkeletonUsers />
        ) : (
          users?.map(({ id, email, active, name }) => (
            <UserInformation
              key={id}
              email={email}
              userName={name}
              active={active}
              id={id}
            />
          ))
        )}
      </div>

      <Button variant="light" onClick={() => setShowNewUserModal(true)}>
        <IconUserPlus size={24} />
        Novo usuário
      </Button>
      <NewUserModal
        visible={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
      />
    </>
  );
}
