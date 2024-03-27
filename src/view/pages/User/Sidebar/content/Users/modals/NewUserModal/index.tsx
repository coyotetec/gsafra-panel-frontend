import { useRef, useState } from 'react';
import { Button } from '../../../../../../../components/Button';
import { Modal } from '../../../../../../../components/Modal';
import { IUserCompanySelect, IUserFormRef, UserForm } from '../UserForm';
import toast from 'react-hot-toast';
import { UserService } from '../../../../../../../../app/services/UserService';
import { APIError } from '../../../../../../../../app/errors/APIError';
import { usePanelContext } from '../../../../../../../../app/hooks/usePanelContext';
import { UserRoleType } from '../../../../../../../../types/users';
import { IconUserPlus } from '@tabler/icons-react';

interface NewUserModalProps {
  visible: boolean;
  onClose: () => void;
}

const headerNewUser = {
  title: 'Novo Usuário',
  description: 'Adicione um novo usuário para ter acesso ao portal',
};

const headerSuccess = {
  title: 'Usuário criado!',
  description:
    'Oriente seu usuário a entrar em seu e-mail cadastrado para finalizar o cadastro no portal.',
};

export interface IUserData {
  name: string;
  email: string;
  role: UserRoleType | undefined;
  company: IUserCompanySelect | null;
  externalId: number | undefined;
}

export function NewUserModal({ onClose, visible }: NewUserModalProps) {
  const [success, setSuccess] = useState(false);

  const { updateUserState } = usePanelContext();
  const newUserFormRef = useRef<IUserFormRef>(null);

  async function handleSubmit(userData: IUserData) {
    try {
      const user = await UserService.createUser({
        ...userData,
        companyId: userData.company?.id,
      });

      const formattedUser = {
        ...user,
        companies: userData.company ? [userData.company] : [],
      };

      updateUserState(formattedUser);

      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      if (err instanceof APIError) toast.error(err.message);
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={success ? headerSuccess.title : headerNewUser.title}
      description={
        success ? headerSuccess.description : headerNewUser.description
      }
      afterClose={() => {
        setSuccess(false);
        newUserFormRef.current?.resetFields();
      }}
    >
      {success ? (
        <Button onClick={onClose} type="button" className="mx-auto mt-6 w-50 ">
          Concluir
        </Button>
      ) : (
        <UserForm
          ref={newUserFormRef}
          submitButtonLabel="Criar"
          SubmitButtonIcon={IconUserPlus}
          typeForm="create"
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      )}
    </Modal>
  );
}
