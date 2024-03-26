import { useState } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../../components/Button';
import { UserInformation } from './UserInformation';
import { NewUserModal } from './modals/NewUserModal';
import { SkeletonUsers } from '../../../../../components/Loaders/SkeletonUsers';
import { usePanelContext } from '../../../../../../app/hooks/usePanelContext';
import { UpdateUserModal } from './modals/UpdateUserModal';
import { IGetUserResponse } from '../../../../../../types/users';

export function Users() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IGetUserResponse | null>(null);

  const {
    isLoading,
    users,
    selectedCompany,
    userCompanies,
    changeSelectedCompany,
  } = usePanelContext();

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>

      {userCompanies && userCompanies.length > 1 ? (
        <select
          value={selectedCompany}
          className="w-1/2 bg-transparent text-sm text-gray-400 outline-none"
          onChange={changeSelectedCompany}
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
