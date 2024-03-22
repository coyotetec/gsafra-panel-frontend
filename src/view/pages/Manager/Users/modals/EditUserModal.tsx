import { useCallback, useRef } from 'react';
import { IGetUserResponse, IUserPayload } from '../../../../../types/users';
import { IUserFormRef, UserForm, userRoles } from '../components/UserForm';
import { Modal } from '../../../../components/Modal';
import { IconUserEdit } from '@tabler/icons-react';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { UserService } from '../../../../../app/services/UserService';

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  onEdited: (user: IGetUserResponse) => void;
  user: IGetUserResponse | null;
}

export function EditUserModal({
  visible,
  onClose,
  onEdited,
  user,
}: EditUserModalProps) {
  const userFormRef = useRef<IUserFormRef>();
  const userFormCallback = useCallback(
    (node: IUserFormRef | null) => {
      if (node !== null) {
        userFormRef.current = node;

        if (user) {
          node.setFieldsValues({
            name: user.name,
            email: user.email,
            userRole: userRoles.find((role) => role.value === user.role),
            companyId: user.companies[0] ? user.companies[0].id : undefined,
            gsafraUserId: user.externalId !== 0 ? user.externalId : undefined,
          });
        }
      }
    },
    [user],
  );

  async function handleSubmit(payload: IUserPayload) {
    try {
      const userEdited = await UserService.managerUpdateUser(user!.id, payload);

      onEdited({
        ...userEdited,
        companies: payload.company
          ? [{ id: payload.company.id, name: payload.company.name }]
          : [],
      });
      toast.success('Usuário editado com sucesso!');
      userFormRef.current?.resetFields();
      onClose();
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
      title="Editar Usuário"
      description={`Edite os dados do usuário ${user?.name}`}
    >
      <UserForm
        ref={userFormCallback}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitButtonLabel="Editar"
        SubmitButtonIcon={IconUserEdit}
      />
    </Modal>
  );
}
