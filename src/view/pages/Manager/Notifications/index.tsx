import { IconPlus } from '@tabler/icons-react';
import { Button } from '../../../components/Button';
import { CreateNotificationModal } from './modals/CreateNotificationModal';
import { useEffect, useState } from 'react';
import { NotificationService } from '../../../../app/services/NotificationService';
import { IGetNotificationResponse } from '../../../../types/notification';
import { APIError } from '../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { NotificationRow } from './components/NotificationRow';
import { SkeletonNotificationsTable } from '../../../components/Loaders/SkeletonNotificationsTable';
import { EditNotificationModal } from './modals/EditNotificationModal';
import { DeleteNotificationModal } from './modals/DeleteNotificationModal';
import { useManager } from '../../../../app/hooks/useManager';

export function Notifications() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<IGetNotificationResponse | null>(null);
  const { notifications, setNotifications, notificationsLoaded } = useManager();

  function handleAddNewNotification(notification: IGetNotificationResponse) {
    setNotifications((prevState) => [notification].concat(prevState));
  }

  function handleUpdateNotification(notification: IGetNotificationResponse) {
    setNotifications((prevState) =>
      prevState.map((item) =>
        item.id === notification.id ? notification : item,
      ),
    );
  }

  function handleDeleteNotification(notificationId: string) {
    setNotifications((prevState) =>
      prevState.filter((notification) => notification.id !== notificationId),
    );
  }

  useEffect(() => {
    async function loadData() {
      try {
        if (!notificationsLoaded.current) {
          setIsLoading(true);
          const notificationsData =
            await NotificationService.getNotifications();

          setNotifications(notificationsData);
          notificationsLoaded.current = true;
        }
      } catch (err) {
        if (err instanceof APIError) {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [notificationsLoaded, setNotifications]);

  return (
    <>
      <DeleteNotificationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={handleDeleteNotification}
        notification={selectedNotification}
      />
      <EditNotificationModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEdited={handleUpdateNotification}
        notification={selectedNotification}
      />
      <CreateNotificationModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreated={handleAddNewNotification}
      />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black-100">Notificações</h1>
          <p className="text-black-80">
            {notifications.length === 1
              ? '1 notificação encontrada'
              : `${notifications.length} notificações encontradas`}
          </p>
        </div>
        <Button className="w-56" onClick={() => setCreateModalVisible(true)}>
          <IconPlus />
          Nova Notificação
        </Button>
      </header>

      <table className="mt-5 w-full overflow-hidden rounded-xl text-left text-sm text-black-80">
        <thead className="bg-primary-40 text-primary-500">
          <tr>
            <th scope="col" className="w-[26%] px-4 py-5 font-semibold">
              Título
            </th>
            <th scope="col" className="w-[26%] px-4 py-5 font-semibold">
              Corpo
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Destinatário
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Data
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonNotificationsTable />
          ) : (
            notifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                data={notification}
                onEdit={() => {
                  setSelectedNotification(notification);
                  setEditModalVisible(true);
                }}
                onDelete={() => {
                  setSelectedNotification(notification);
                  setDeleteModalVisible(true);
                }}
              />
            ))
          )}
          {!isLoading && notifications.length === 0 && (
            <tr className="border-b bg-white">
              <td
                colSpan={5}
                className="max-w-[0] truncate p-4 text-center font-semibold"
              >
                Nenhuma notificação cadastrada, comece criando uma!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
