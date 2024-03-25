import { IconEdit } from '@tabler/icons-react';
import { cn } from '../../../../../app/utils/cn';
import { IGetUserResponse } from '../../../../../types/users';
import { Switch } from '../../../../components/Switch';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { UserService } from '../../../../../app/services/UserService';
import { APIError } from '../../../../../app/errors/APIError';
import { Spinner } from '../../../../components/Loaders/Spinner';

interface UserRowProps {
  data: IGetUserResponse;
  onToggleStatus: () => void;
  onEdit: () => void;
}

export function UserRow({ data, onToggleStatus, onEdit }: UserRowProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggleStatus() {
    try {
      setIsLoading(true);

      if (data.active) {
        const { message } = await UserService.inactivateUser(data.id);
        toast.success(message);
      } else {
        const { message } = await UserService.activateUser(data.id);
        toast.success(message);
      }

      onToggleStatus();
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <tr className="border-b bg-white" key={data.id}>
      <th scope="row" className="p-4 font-semibold">
        {data.name}
      </th>
      <td className="p-4">
        {data.companies.map((company) => company.name).join(', ')}
      </td>
      <td className="p-4">
        <span
          className={cn(
            'rounded-full px-2 py-1 text-xs font-medium leading-none text-white',
            data.role === 'MANAGER' && 'bg-primary-900',
            data.role === 'ADMIN' && 'bg-primary-500',
            data.role === 'USER' && 'bg-primary-200',
          )}
        >
          {data.role}
        </span>
      </td>
      <td className="p-4">
        <span
          className={cn(
            'mr-2 inline-block h-2 w-2 rounded-full',
            data.active ? 'bg-primary-300' : 'bg-red-500',
          )}
        />
        {data.active ? 'Ativo' : 'Inativo'}
      </td>
      <td className="flex items-center gap-4 p-4">
        <button className="text-secondary-500" onClick={onEdit}>
          <IconEdit size={20} />
        </button>
        {isLoading ? (
          <Spinner className="ml-2.5 text-primary-500" />
        ) : (
          <Switch checked={data.active} onChange={() => handleToggleStatus()} />
        )}
      </td>
    </tr>
  );
}
