import { useEffect, useState } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { UserInformation } from '../components/UserInformation';
import { NewUserModal } from '../components/NewUserModal';
import { UserService } from '../../../../../app/services/UserService';
import { IGetUsersResponse } from '../../../../../types/users';

export function Users() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [users, setUsers] = useState<IGetUsersResponse[] | null>(null);

  useEffect(() => {
    async function getUsers() {
      const usersData = await UserService.getUsers();
      setUsers(usersData);
    }

    getUsers();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>
      <div className="mt-6 flex flex-1 flex-col items-stretch gap-6">
        {users?.map(({ id, email, active, name }) => (
          <UserInformation
            key={id}
            email={email}
            userName={name}
            active={active}
            id={id}
          />
        ))}
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
