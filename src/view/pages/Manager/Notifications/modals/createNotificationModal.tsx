import { useRef } from 'react';
import { Modal } from '../../../../components/Modal';
import {
  INotificationFormRef,
  NotificationForm,
} from '../components/NotificationForm';
import {
  IGetNotificationResponse,
  INotificationPayload,
} from '../../../../../types/notification';
import { NotificationService } from '../../../../../app/services/NotificationService';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { IconPlus } from '@tabler/icons-react';

interface CreateNotificationModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (notification: IGetNotificationResponse) => void;
}

export function CreateNotificationModal({
  visible,
  onClose,
  onCreated,
}: CreateNotificationModalProps) {
  const notificationFormRef = useRef<INotificationFormRef>(null);

  async function handleSubmit(payload: INotificationPayload) {
    try {
      const notificationCreated =
        await NotificationService.createNotification(payload);

      onCreated({
        ...notificationCreated,
        recipients: payload.selectedCompanies,
      });
      onClose();
      toast.success('Notificação criada com sucesso!');
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
      title="Nova Notificação"
      description="Libere uma nova notificação para os usuários."
    >
      <NotificationForm
        ref={notificationFormRef}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitButtonLabel="Criar"
        SubmitButtonIcon={IconPlus}
      />
    </Modal>
  );
}
