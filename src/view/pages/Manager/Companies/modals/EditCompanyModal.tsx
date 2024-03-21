import { Modal } from '../../../../components/Modal';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import {
  ICompanyPayload,
  IGetCompanyReponse,
} from '../../../../../types/company';
import { CompanyForm, ICompanyFormRef } from '../components/CompanyForm';
import { useCallback, useRef } from 'react';
import { CompanyService } from '../../../../../app/services/CompanyService';
import { IconEdit } from '@tabler/icons-react';

interface EditCompanyModalProps {
  visible: boolean;
  onClose: () => void;
  onEdited: (company: IGetCompanyReponse) => void;
  company: IGetCompanyReponse | null;
}

export function EditCompanyModal({
  visible,
  onClose,
  onEdited,
  company,
}: EditCompanyModalProps) {
  const formRef = useRef<ICompanyFormRef>();
  const companyFormRef = useCallback(
    (node: ICompanyFormRef | null) => {
      if (node !== null) {
        formRef.current = node;

        if (company) {
          node.setFieldsValue({
            name: company.name,
            code: company.externalId,
          });
        }
      }
    },
    [company],
  );

  async function handleSubmit(payload: ICompanyPayload) {
    try {
      const companyEdited = await CompanyService.updateCompany(
        company!.id,
        payload,
      );

      onEdited({ ...companyEdited, usersQty: company!.usersQty });
      onClose();
      toast.success('Empresa atualizada com sucesso!');
      formRef.current?.resetFields();
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
      title="Editar Empresa"
      description={`Edite os dados da empresa ${company?.name}`}
    >
      <CompanyForm
        ref={companyFormRef}
        onClose={onClose}
        onSubmit={handleSubmit}
        SubmitButtonIcon={IconEdit}
        submitButtonLabel="Editar"
      />
    </Modal>
  );
}
