import { useCallback, useRef, useState } from 'react';
import { Modal } from '../../../../../../../components/Modal';
import toast from 'react-hot-toast';
import { IUserFormRef, UserForm } from '../UserForm';
import { IconUserEdit } from '@tabler/icons-react';
import { IUserData } from '../NewUserModal';
import { IGetUserResponse } from '../../../../../../../../types/users';
import { UserService } from '../../../../../../../../app/services/UserService';
import { APIError } from '../../../../../../../../app/errors/APIError';
import { usePanelContext } from '../../../../../../../../app/hooks/usePanelContext';
import { Button } from '../../../../../../../components/Button';

interface UpdateUserModalProps {
  visible: boolean;
  onClose: () => void;
  user: IGetUserResponse | null;
}

export function UpdateUserModal({
  onClose,
  visible,
  user,
}: UpdateUserModalProps) {
  const { updateUserState } = usePanelContext();

  const [success, setSuccess] = useState(false);
  const userFormRef = useRef<IUserFormRef>();
  const userFormCallback = useCallback(
    (node: IUserFormRef | null) => {
      if (node !== null) {
        userFormRef.current = node;

        if (user) {
          node.setFieldsValues({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            externalId: user.externalId,
            companies: user.companies,
            active: user.active,
          });
        }
      }
    },
    [user],
  );

  async function handleSubmit(userData: IUserData) {
    try {
      const updatedUser = await UserService.updateUser(
        {
          name: userData.name,
          email: userData.email,
          role: userData.role,
          externalId: userData.externalId,
        },
        user!.id,
      );

      updateUserState({
        ...updatedUser,
        companies: userData.company ? [userData.company] : [],
      });

      setSuccess(true);
    } catch (err) {
      if (err instanceof APIError) toast.error(err.message);
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Editar usuário"
      afterClose={() => {
        setSuccess(false);
        userFormRef.current?.resetFields();
      }}
    >
      {success ? (
        <Button onClick={onClose} type="button" className="mx-auto mt-6 w-50 ">
          Concluir
        </Button>
      ) : (
        <UserForm
          ref={userFormCallback}
          onClose={onClose}
          submitButtonLabel="Editar"
          typeForm="update"
          SubmitButtonIcon={IconUserEdit}
          onSubmit={handleSubmit}
        />
      )}
    </Modal>
  );
}
