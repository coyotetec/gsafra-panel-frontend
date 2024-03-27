import { IconRefresh } from '@tabler/icons-react';
import { usePanelContext } from '../../../../../../app/hooks/usePanelContext';
import { Notification } from './Notification';
import { SkeletonNotifications } from '../../../../../components/Loaders/SkeletonNotifications';

export function Notifications() {
  const { notifications, getNotifications, notificationIsLoading } =
    usePanelContext();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Notificações</h1>
        <button
          type="button"
          onClick={getNotifications}
          className="rounded-[4px] bg-primary-700 p-1 text-white"
        >
          <IconRefresh size={16} />
        </button>
      </div>
      <div className="sidebar-scroll sidebar-scroll-thumb mt-6 flex flex-col gap-3 overflow-auto pr-2">
        {notificationIsLoading ? (
          <SkeletonNotifications />
        ) : (
          notifications?.map(({ id, title, body, createdAt }) => (
            <Notification key={id} title={title} body={body} date={createdAt} />
          ))
        )}
        {(notifications?.length === 0 || !notifications) && (
          <p className="text-sm text-gray-400">
            Não há notificações para exibir
          </p>
        )}
      </div>
    </>
  );
}
