import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useState } from 'react';

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
}

interface IUserRole {
  value: string;
  label: string;
}

interface ICompany {
  id: string;
  name: string;
}

interface IDesktopUser {
  id: number;
  name: string;
}

const companies: ICompany[] = [
  { id: '1', name: 'GSafra' },
  { id: '2', name: 'Fazenda Maria Julia' },
  { id: '3', name: 'Loureiro Agrícola' },
  { id: '4', name: 'Escritório Mavil' },
  { id: '5', name: 'Ítalo Bicalho' },
];
const userRoles: IUserRole[] = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'USER', label: 'Usuário Comum' },
  { value: 'MANAGER', label: 'Gerenciador' },
];

const desktopUser: IDesktopUser[] = [
  { id: 1, name: 'IRAN' },
  { id: 2, name: 'CALEB' },
  { id: 3, name: 'GABRIEL' },
];

export function CreateUserModal({ visible, onClose }: CreateUserModalProps) {
  const [selectedUserRole, setSelectedUserRole] = useState<
    IUserRole | undefined
  >();
  const [selectedCompany, setSelectedCompany] = useState<
    ICompany | undefined
  >();
  const [selectedDesktopUser, setSelectedDesktopUser] = useState<
    IDesktopUser | undefined
  >();

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Novo Usuário"
      description="Adicione um novo usuário para ter acesso ao portal."
    >
      <form className="mt-6 flex flex-col gap-3">
        <Input label="Nome" placeholder="Nome do usuário" name="name" />
        <Input label="E-mail" placeholder="E-mail do usuário" name="email" />
        <Select
          label="Papel de Usuário"
          placeholder="Selecione um papel"
          options={userRoles}
          labelKey="label"
          valueKey="value"
          selected={selectedUserRole}
          setSelected={setSelectedUserRole}
        />
        <Select
          label="Empresa"
          placeholder="Selecione uma empresa"
          options={companies}
          labelKey="name"
          valueKey="id"
          selected={selectedCompany}
          setSelected={setSelectedCompany}
        />
        {selectedUserRole?.value !== 'MANAGER' && (
          <Select
            label="Usuário no  Sistema"
            placeholder="Selecione um usuário"
            options={desktopUser}
            labelKey="name"
            valueKey="id"
            selected={selectedDesktopUser}
            setSelected={setSelectedDesktopUser}
          />
        )}
      </form>

      <footer className="mx-auto mt-8 flex justify-center gap-2">
        <Button variant="secondary" className="w-40" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="w-40">
          <IconUserPlus />
          Criar
        </Button>
      </footer>
    </Modal>
  );
}
