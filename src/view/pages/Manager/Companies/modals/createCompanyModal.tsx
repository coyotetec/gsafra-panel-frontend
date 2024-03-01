import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';

interface CreateCompanyModalProps {
  visible: boolean;
  onClose: () => void;
}

export function CreateCompanyModal({
  visible,
  onClose,
}: CreateCompanyModalProps) {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Nova Empresa"
      description="Adicione uma nova empresa ao portal."
    >
      <form className="mt-6 flex flex-col gap-3">
        <Input label="Nome" placeholder="Nome da empresa" name="name" />
        <Input
          label="Código"
          placeholder="Código da empresa"
          prefix="#"
          name="code"
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
