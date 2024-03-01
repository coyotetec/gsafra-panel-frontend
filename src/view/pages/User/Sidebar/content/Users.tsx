import { useState } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { UserInformation } from '../components/UserInformation';
import { NewUserModal } from '../components/NewUserModal';

export function Users() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>
      <div className="mt-6 flex flex-1 flex-col items-stretch gap-6">
        <UserInformation userName="Iran Adryan" email="iran@gmail.com" />
        <UserInformation userName="Caleb Lima" email="caleb@gmail.com" />
      </div>

      <Button variant="light" onClick={() => setShowNewUserModal(true)}>
        <IconUserPlus size={24} />
        Novo usuário
      </Button>

      {showNewUserModal && (
        <NewUserModal
          visible={showNewUserModal}
          onClose={() => setShowNewUserModal(false)}
        />
      )}
    </>
  );
}
