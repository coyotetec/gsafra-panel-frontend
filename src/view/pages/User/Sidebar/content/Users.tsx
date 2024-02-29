import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { UserInformation } from '../components/UserInformation';

export function Users() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Usuários</h1>
      <div className="mt-6 flex flex-1 flex-col items-stretch gap-6">
        <UserInformation userName="Iran Adryan" email="iran@gmail.com" />
        <UserInformation userName="Caleb Lima" email="caleb@gmail.com" />
      </div>

      <Button variant="light" className="">
        <IconUserPlus size={24} />
        Novo usuário
      </Button>
    </>
  );
}
