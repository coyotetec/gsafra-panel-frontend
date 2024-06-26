import { useState } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../../components/Button';
import { UserInformation } from './UserInformation';
import { NewUserModal } from './modals/NewUserModal';
import { SkeletonUsers } from '../../../../../components/Loaders/SkeletonUsers';
import { usePanelContext } from '../../../../../../app/hooks/usePanelContext';
import { UpdateUserModal } from './modals/UpdateUserModal';
import { IGetUserResponse } from '../../../../../../types/users';
import { SelectCompany } from '../../../../../components/SelectCompany';

export function Users() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IGetUserResponse | null>(null);

  const { isLoading, users, userCompanies } = usePanelContext();

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>

      {userCompanies && userCompanies.companies.length > 1 && (
        <div className="absolute top-16">
          <SelectCompany />
        </div>
      )}

      <div className="sidebar-scroll sidebar-scroll-thumb mb-4 mt-6 flex h-full flex-1 flex-col items-stretch gap-6 overflow-auto pr-2">
        {isLoading ? (
          <SkeletonUsers />
        ) : (
          users?.map((user) => (
            <UserInformation
              key={user.id}
              email={user.email}
              userName={user.name}
              active={user.active}
              id={user.id}
              handleEditUser={() => {
                setShowUpdateUserModal(true);
                setUserToEdit(user);
              }}
            />
          ))
        )}

        {(users?.length === 0 || !users) && !isLoading ? (
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
        visible={showNewUserModal}
        onClose={() => setShowNewUserModal(false)}
      />
      <UpdateUserModal
        visible={showUpdateUserModal}
        onClose={() => setShowUpdateUserModal(false)}
        user={userToEdit}
      />
    </>
  );
}
