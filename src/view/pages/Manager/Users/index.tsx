import { IconEdit, IconPlus } from '@tabler/icons-react';
import { Switch } from '../../../components/Switch';
import { cn } from '../../../../app/utils/cn';
import { Button } from '../../../components/Button';
import { CreateUserModal } from './modals/createUserModal';
import { useState } from 'react';

interface IUser {
  name: string;
  company: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
  active: boolean;
}

const usersMock: IUser[] = [
  {
    name: 'Iran Adryan',
    company: 'GSafra',
    role: 'MANAGER',
    active: true,
  },
  {
    name: 'Caleb Cardoso',
    company: 'Escritório Mavil',
    role: 'ADMIN',
    active: true,
  },
  {
    name: 'Elias Gabriel',
    company: 'Loureiro Agro',
    role: 'USER',
    active: false,
  },
];

export function Users() {
  const [createModalVisible, setCreateModalVisible] = useState(false);

  return (
    <>
      <CreateUserModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black-100">Usuários</h1>
          <p className="text-black-80">
            {usersMock.length === 1
              ? '1 usuário encontrada'
              : `${usersMock.length} usuários encontradas`}
          </p>
        </div>
        <Button className="w-56" onClick={() => setCreateModalVisible(true)}>
          <IconPlus />
          Nova Usuário
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
          {usersMock.map((user) => (
            <tr className="border-b bg-white" key={user.name}>
              <th scope="row" className="p-4 font-semibold">
                {user.name}
              </th>
              <td className="p-4">{user.company}</td>
              <td className="p-4">
                <span
                  className={cn(
                    'rounded-full px-2 py-1 text-xs font-medium leading-none text-white',
                    user.role === 'MANAGER' && 'bg-primary-900',
                    user.role === 'ADMIN' && 'bg-primary-500',
                    user.role === 'USER' && 'bg-primary-200',
                  )}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={cn(
                    'mr-2 inline-block h-2 w-2 rounded-full',
                    user.active ? 'bg-primary-300' : 'bg-red-500',
                  )}
                />
                {user.active ? 'Ativo' : 'Inativo'}
              </td>
              <td className="flex items-center gap-4 p-4">
                <button className="text-secondary-500">
                  <IconEdit size={20} />
                </button>
                <Switch />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
