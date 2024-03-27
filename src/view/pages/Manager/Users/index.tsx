import { IconPlus } from '@tabler/icons-react';
import { Button } from '../../../components/Button';
import { CreateUserModal } from './modals/createUserModal';
import { useEffect, useState } from 'react';
import { UserService } from '../../../../app/services/UserService';
import { IGetUserResponse } from '../../../../types/users';
import { APIError } from '../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { SkeletonUsersTable } from '../../../components/Loaders/SkeletonUsersTable';
import { UserRow } from './components/UserRow';
import { EditUserModal } from './modals/EditUserModal';
import { useManager } from '../../../../app/hooks/useManager';
import { orderUsersByCompany } from '../../../../app/utils/orderUserssByCOmpany';

export function Users() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IGetUserResponse | null>(
    null,
  );
  const { users, setUsers, usersLoaded } = useManager();

  function handleToggleUserStatus(userId: string) {
    setUsers((prevState) => {
      const newState = [...prevState];

      return newState.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user,
      );
    });
  }

  function handleAddNewUser(user: IGetUserResponse) {
    setUsers((prevState) => prevState.concat(user));
  }

  function handleUpdateUser(user: IGetUserResponse) {
    setUsers((prevState) =>
      prevState.map((item) => (item.id === user.id ? user : item)),
    );
  }

  useEffect(() => {
    async function loadData() {
      try {
        if (!usersLoaded.current) {
          setIsLoading(true);
          const usersData = await UserService.getUsers();

          setUsers(orderUsersByCompany(usersData));
          usersLoaded.current = true;
        }
      } catch (err) {
        if (err instanceof APIError) {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [setUsers, usersLoaded]);

  return (
    <>
      <EditUserModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEdited={handleUpdateUser}
        user={selectedUser}
      />
      <CreateUserModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreated={handleAddNewUser}
      />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black-100">Usuários</h1>
          <p className="text-black-80">
            {users.length === 1
              ? '1 usuário encontrada'
              : `${users.length} usuários encontradas`}
          </p>
        </div>
        <Button className="w-56" onClick={() => setCreateModalVisible(true)}>
          <IconPlus />
          Novo Usuário
        </Button>
      </header>

      <table className="mt-5 w-full overflow-hidden rounded-xl text-left text-sm text-black-80">
        <thead className="bg-primary-40 text-primary-500">
          <tr>
            <th scope="col" className="w-[26%] px-4 py-5 font-semibold">
              Nome
            </th>
            <th scope="col" className="w-[26%] px-4 py-5 font-semibold">
              Empresa
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Papel
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Status
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonUsersTable />
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                data={user}
                onToggleStatus={() => handleToggleUserStatus(user.id)}
                onEdit={() => {
                  setSelectedUser(user);
                  setEditModalVisible(true);
                }}
              />
            ))
          )}
          {!isLoading && users.length === 0 && (
            <tr className="border-b bg-white">
              <td
                colSpan={5}
                className="max-w-[0] truncate p-4 text-center font-semibold"
              >
                Nenhum usuário cadastrada, comece criando uma!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
