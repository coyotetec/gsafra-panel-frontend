import { useState } from 'react';
import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { UserInformation } from '../components/UserInformation';
import { NewUserModal } from '../components/NewUserModal';
import { SkeletonUsers } from '../../../../components/Loaders/SkeletonUsers';
import { useSidebarData } from '../../../../../app/hooks/useSidebarData';

export function Users() {
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const {
    isLoading,
    users,
    selectedCompany,
    userCompanies,
    changeSelectedCompany,
  } = useSidebarData();

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>

      {userCompanies && userCompanies.length !== 0 ? (
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

        {users?.length === 0 && !isLoading ? (
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
      />
    </>
  );
}
