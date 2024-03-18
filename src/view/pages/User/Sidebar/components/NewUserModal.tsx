import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useState } from 'react';

interface NewUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const users = [
  { id: 1, name: 'Iran Adryan' },
  { id: 2, name: 'Caleb Lima' },
  { id: 3, name: 'João Pedro' },
  { id: 4, name: 'Maria Eduarda' },
  { id: 5, name: 'José Carlos' },
];
export function NewUserModal({ onClose, visible }: NewUserModalProps) {
  const [selectedUser, setSelectedUser] = useState('');
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Novo Usuário"
      description="Adicione um novo usuário para ter acesso ao portal"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-3"
      >
        <Input label="Nome" placeholder="Nome" name="name" type="text" />
        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          name="email"
          type="email"
        />
        <Select
          options={users}
          label="Usuário no sistema"
          placeholder="Selecione um usuário"
          valueKey="id"
          labelKey="name"
          selected={selectedUser}
          setSelected={setSelectedUser}
        />

        <footer className="mx-auto mt-6 flex w-82 gap-2 text-center">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button>
            <IconUserPlus />
            Criar
          </Button>
        </footer>
      </form>
    </Modal>
  );
}
