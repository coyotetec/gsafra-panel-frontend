import { Modal } from '../../../../components/Modal';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import {
  ICompanyPayload,
  IGetCompanyReponse,
} from '../../../../../types/company';
import { CompanyService } from '../../../../../app/services/CompanyService';
import { CompanyForm, ICompanyFormRef } from '../components/CompanyForm';
import { useRef } from 'react';
import { IconPlus } from '@tabler/icons-react';

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
  const companyFormRef = useRef<ICompanyFormRef>(null);

  async function handleSubmit(payload: ICompanyPayload) {
    try {
      const companyCreated = await CompanyService.createCompany(payload);

      onCreated({ ...companyCreated, usersQty: 0 });
      onClose();
      toast.success('Empresa criada com sucesso!');
      companyFormRef.current?.resetFields();
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
      title="Nova Empresa"
      description="Adicione uma nova empresa ao portal."
    >
      <CompanyForm
        ref={companyFormRef}
        onClose={onClose}
        onSubmit={handleSubmit}
        SubmitButtonIcon={IconPlus}
        submitButtonLabel="Criar"
      />
    </Modal>
  );
}
