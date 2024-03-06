import { IconUserPlus, IconX } from '@tabler/icons-react';
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

const companies: ICompany[] = [
  { id: '1', name: 'GSafra' },
  { id: '2', name: 'Fazenda Maria Julia' },
  { id: '3', name: 'Loureiro Agrícola' },
  { id: '4', name: 'Escritório Mavil' },
  { id: '5', name: 'Ítalo Bicalho' },
];

export function CreateNotificationModal({
  visible,
  onClose,
}: CreateNotificationModalProps) {
  const [allCompanies, setAllCompanies] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | undefined>(
    undefined,
  );
  const [selectedCompanies, setSelectedCompanies] = useState<ICompany[]>([]);

  function handleAddSelectedCompany(company: ICompany) {
    const companyIncluded = selectedCompanies.find(
      (item) => item.id === company.id,
    );

    if (!companyIncluded) {
      setSelectedCompanies((prevState) => prevState.concat(company));
    }
  }

  function handleRemoveSelectedCompany(id: string) {
    setSelectedCompanies((prevState) =>
      prevState.filter((item) => item.id !== id),
    );
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Nova Notificação"
      description="Libere uma nova notificação para os usuários."
    >
      <form className="mt-6 flex flex-col gap-3">
        <Input
          label="Título"
          placeholder="Título da notificação"
          name="title"
        />
        <TextArea
          label="Corpo"
          placeholder="Corpo da notificação"
          name="body"
        />
        <Checkbox
          checked={allCompanies}
          onChange={(value) => {
            setAllCompanies(value);
            setSelectedCompany(undefined);
            setSelectedCompanies([]);
          }}
        />
        {!allCompanies && (
          <>
            <Select
              label="Empresas"
              placeholder="Selecione uma ou mais empresas"
              options={companies}
              valueKey="id"
              labelKey="name"
              selected={selectedCompany}
              setSelected={(value) => {
                setSelectedCompany(value);
                handleAddSelectedCompany(value);
              }}
            />
            <div className="-mt-1 flex flex-wrap gap-1">
              {selectedCompanies.map((company) => (
                <span
                  key={company.id}
                  className="flex items-center gap-1 rounded-full bg-primary-40 px-2 py-1.5 text-sm text-primary-600"
                >
                  {company.name}
                  <button
                    type="button"
                    className="rounded-full outline-none hover:bg-primary-50"
                    onClick={() => handleRemoveSelectedCompany(company.id)}
                  >
                    <IconX size={16} />
                  </button>
                </span>
              ))}
            </div>
          </>
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
