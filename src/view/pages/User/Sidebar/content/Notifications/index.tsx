import { usePanelContext } from '../../../../../../app/hooks/usePanelContext';
import { Notification } from './Notification';

export function Notifications() {
  const { notifications } = usePanelContext();

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Notificações</h1>
      <div className="mt-6 flex flex-col gap-3">
        {notifications?.map(({ id, title, body, createdAt }) => (
          <Notification key={id} title={title} body={body} date={createdAt} />
        ))}
      </div>
    </>
  );
}
