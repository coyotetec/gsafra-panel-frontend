import { Modal } from '../../../../components/Modal';
import { IGetNotificationResponse } from '../../../../../types/notification';
import { Button } from '../../../../components/Button';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { APIError } from '../../../../../app/errors/APIError';
import { NotificationService } from '../../../../../app/services/NotificationService';

interface DeleteNotificationModal {
  visible: boolean;
  onClose: () => void;
  onDelete: (notificationId: string) => void;
  notification: IGetNotificationResponse | null;
}

export function DeleteNotificationModal({
  visible,
  notification,
  onClose,
  onDelete,
}: DeleteNotificationModal) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);

      const { message } = await NotificationService.deleteNotification(
        notification!.id,
      );

      onDelete(notification!.id);
      onClose();
      toast.success(message);
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Deletar Notificação"
      description={`Tem certeza que deseja deletar a notificação ${notification?.title}? Esta
    ação é irreversível.`}
      danger
    >
      <footer className="mx-auto mt-8 flex justify-center gap-2">
        <Button
          type="button"
          variant="secondary"
          className="w-40"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="danger"
          className="w-40"
          loading={isLoading}
          disabled={isLoading}
          onClick={handleDelete}
        >
          <IconTrash />
          Deletar
        </Button>
      </footer>
    </Modal>
  );
}
