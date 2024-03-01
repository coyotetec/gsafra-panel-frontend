import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { TextArea } from '../../../../components/TextArea';
import { Checkbox } from '../../../../components/Checkbox';
import { useState } from 'react';
import { Select } from '../../../../components/Select';

interface CreateNotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ICompany {
  id: string;
  name: string;
}

export function CreateNotificationModal({
  visible,
  onClose,
}: CreateNotificationModalProps) {
  const [allCompanies, setAllCompanies] = useState(true);
  const companies: ICompany[] = [
    { id: '1', name: 'GSafra' },
    { id: '2', name: 'Fazenda Maria Julia' },
    { id: '3', name: 'Loureiro Agrícola' },
    { id: '4', name: 'Escritório Mavil' },
    { id: '5', name: 'Ítalo Bicalho' },
  ];

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Nova Notificação"
      description="Libere uma nova notificação para os usuários."
    >
      <form className="mt-6 flex flex-col gap-3">
        <Input label="Nome" placeholder="Nome da empresa" name="name" />
        <TextArea
          label="Corpo"
          placeholder="Corpo da notificação"
          name="body"
        />
        <Checkbox checked={allCompanies} onChange={setAllCompanies} />
        <Select
          label="Empresas"
          placeholder="Selecione uma ou mais empresas"
          options={companies}
          valueKey="id"
          labelKey="name"
        />
      </form>

      <footer className="mx-auto mt-8 flex justify-center">
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
