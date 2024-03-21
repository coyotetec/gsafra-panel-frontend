import { useCallback, useRef } from 'react';
import {
  IGetNotificationResponse,
  INotificationPayload,
} from '../../../../../types/notification';
import { Modal } from '../../../../components/Modal';
import {
  INotificationFormRef,
  NotificationForm,
} from '../components/NotificationForm';
import { NotificationService } from '../../../../../app/services/NotificationService';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { IconEdit } from '@tabler/icons-react';

interface EditNotificationModalProps {
  visible: boolean;
  onClose: () => void;
  onEdited: (notification: IGetNotificationResponse) => void;
  notification: IGetNotificationResponse | null;
}

export function EditNotificationModal({
  visible,
  onClose,
  onEdited,
  notification,
}: EditNotificationModalProps) {
  const notificationFormRef = useRef<INotificationFormRef>();
  const notificationFormCallback = useCallback(
    (node: INotificationFormRef | null) => {
      if (node !== null) {
        notificationFormRef.current = node;

        if (notification) {
          node.setFieldsValues({
            title: notification.title,
            body: notification.body,
            allCompanies: notification.allCompanies,
            selectedCompanies: notification.recipients,
          });
        }
      }
    },
    [notification],
  );

  async function handleSubmit(payload: INotificationPayload) {
    try {
      const notificationEdited = await NotificationService.updateNotification(
        notification!.id,
        payload,
      );

      onEdited({
        ...notificationEdited,
        recipients: payload.selectedCompanies,
      });
      onClose();
      toast.success('Notificação atualizada com sucesso!');
      notificationFormRef.current?.resetFields();
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
      title="Editar Notificação"
      description={`Edite os dados da notificação ${notification?.title}`}
    >
      <NotificationForm
        ref={notificationFormCallback}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitButtonLabel="Editar"
        SubmitButtonIcon={IconEdit}
      />
    </Modal>
  );
}
