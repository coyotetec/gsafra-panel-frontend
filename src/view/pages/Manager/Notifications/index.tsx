import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { format } from 'date-fns';
import { Button } from '../../../components/Button';
import { CreateNotificationModal } from './modals/createNotificationModal';
import { useState } from 'react';

interface INotifications {
  title: string;
  body: string;
  recipient: string[];
  date: Date;
}

const companiesMock: INotifications[] = [
  {
    title: 'Versão 1.4.3.3',
    body: 'Melhorias no monitoramento de notas fiscais.',
    recipient: [],
    date: new Date(),
  },
  {
    title: 'Aviso de Vencimento',
    body: 'Sua fatura 02/2024 está próximo do vencimento.',
    recipient: ['Agricultura Paraíso'],
    date: new Date(),
  },
  {
    title: 'Instabilidade no Sistema',
    body: 'No dia 23/02 o sistema passará por instabilidade entre 14h e 17h.',
    recipient: [],
    date: new Date(),
  },
];

export function Notifications() {
  const [createModalVisible, setCreateModalVisible] = useState(true);

  function formatRecipient(recipient: string[]) {
    if (recipient.length === 0) {
      return 'Todos';
    }

    if (recipient.length === 1) {
      return recipient[0];
    }

    if (recipient.length > 1) {
      return `${recipient.length} Empresas`;
    }
  }

  return (
    <>
      <CreateNotificationModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black-100">Notificações</h1>
          <p className="text-black-80">
            {companiesMock.length === 1
              ? '1 notificação encontrada'
              : `${companiesMock.length} notificações encontradas`}
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
          {companiesMock.map((notifications) => (
            <tr className="border-b bg-white" key={notifications.title}>
              <th scope="row" className="max-w-[0] truncate p-4 font-semibold">
                {notifications.title}
              </th>
              <td className="max-w-[0] truncate p-4">{notifications.body}</td>
              <td className="max-w-[0] truncate p-4">
                {formatRecipient(notifications.recipient)}
              </td>
              <td className="p-4">
                {format(notifications.date, 'dd/MM/yyyy - HH:mm')}
              </td>
              <td className="flex items-center gap-4 p-4">
                <button className="text-secondary-500">
                  <IconEdit size={20} />
                </button>
                <button className="text-red-500">
                  <IconTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
