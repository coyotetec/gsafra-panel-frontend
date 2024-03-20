import { format } from 'date-fns';
import {
  IGetNotificationResponse,
  IRecipient,
} from '../../../../../types/notification';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface NotificationRowProps {
  data: IGetNotificationResponse;
  onEdit: () => void;
  onDelete: () => void;
}

export function NotificationRow({
  data,
  onEdit,
  onDelete,
}: NotificationRowProps) {
  function formatRecipient(recipient: IRecipient[]) {
    if (recipient.length === 0) {
      return 'Todos';
    }

    if (recipient.length === 1) {
      return recipient[0].name;
    }

    if (recipient.length > 1) {
      return `${recipient.length} Empresas`;
    }
  }

  return (
    <tr className="border-b bg-white" key={data.title}>
      <th scope="row" className="max-w-[0] truncate p-4 font-semibold">
        {data.title}
      </th>
      <td className="max-w-[0] truncate p-4">{data.body}</td>
      <td className="max-w-[0] truncate p-4">
        {formatRecipient(data.recipients)}
      </td>
      <td className="p-4">{format(data.createdAt, 'dd/MM/yyyy - HH:mm')}</td>
      <td className="flex items-center gap-4 p-4">
        <button className="text-secondary-500" onClick={onEdit}>
          <IconEdit size={20} />
        </button>
        <button className="text-red-500" onClick={onDelete}>
          <IconTrash size={20} />
        </button>
      </td>
    </tr>
  );
}
