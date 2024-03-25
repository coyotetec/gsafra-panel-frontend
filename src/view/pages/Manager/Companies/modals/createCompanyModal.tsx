import { Modal } from '../../../../components/Modal';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import {
  ICompanyPayload,
  IGetCompanyReponse,
} from '../../../../../types/company';
import { CompanyService } from '../../../../../app/services/CompanyService';
import { CompanyForm, ICompanyFormRef } from '../components/CompanyForm';
import { useRef, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { CreateUsersForm } from '../components/CreateUsersForm';
import { GsafraUserService } from '../../../../../app/services/GsafraUserService';
import { IGetGsafraUserResponse } from '../../../../../types/gsafraUser';
import { Button } from '../../../../components/Button';

interface CreateCompanyModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (company: IGetCompanyReponse) => void;
}

export function CreateCompanyModal({
  visible,
  onClose,
  onCreated,
}: CreateCompanyModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [gsafraUsers, setGsafraUsers] = useState<IGetGsafraUserResponse[]>([]);
  const [company, setCompany] = useState<IGetCompanyReponse | null>(null);
  const companyFormRef = useRef<ICompanyFormRef>(null);
  const steps = [
    {
      title: 'Nova Empresa',
      description: 'Adicione uma nova empresa ao portal.',
    },
    {
      title: 'Encontramos Usuários',
      description:
        'Esses são os usuários que já estão criados no sistema selecione os que deseja adicionar ao portal.',
    },
    {
      title: 'Usuários Criados!',
      description:
        'Oriente seus usuários a entrarem em seus e-mails cadastrados para finalizar o cadastro no portal.',
    },
  ];

  async function loadGsafraUsers(companyId: string) {
    const gsafraUsersData = await GsafraUserService.getGsafraUsers(companyId);

    console.log(gsafraUsersData);
    setGsafraUsers(gsafraUsersData);

    return gsafraUsersData.length;
  }

  async function handleSubmit(payload: ICompanyPayload) {
    try {
      const companyCreated = await CompanyService.createCompany(payload);

      onCreated({ ...companyCreated, usersQty: 0 });
      setCompany({ ...companyCreated, usersQty: 0 });
      toast.success('Empresa criada com sucesso!');

      const gsafraUsersQty = await loadGsafraUsers(companyCreated.id);

      if (gsafraUsersQty === 0) {
        onClose();
      } else {
        setCurrentStep(1);
      }
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={steps[currentStep].title}
      description={steps[currentStep].description}
      afterClose={() => {
        setCurrentStep(0);
        setCompany(null);
        setGsafraUsers([]);
        companyFormRef.current?.resetFields();
      }}
    >
      {currentStep === 0 && (
        <CompanyForm
          ref={companyFormRef}
          onClose={onClose}
          onSubmit={handleSubmit}
          SubmitButtonIcon={IconPlus}
          submitButtonLabel="Criar"
        />
      )}
      {currentStep === 1 && (
        <CreateUsersForm
          users={gsafraUsers}
          onClose={onClose}
          company={company}
          goNextStep={() => setCurrentStep(2)}
        />
      )}
      {currentStep === 2 && (
        <Button className=" mx-auto mt-6 w-40" onClick={onClose}>
          Concluir
        </Button>
      )}
    </Modal>
  );
}
