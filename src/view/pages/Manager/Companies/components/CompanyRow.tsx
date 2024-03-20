import { IconEdit } from '@tabler/icons-react';
import { IGetCompanyReponse } from '../../../../../types/company';
import { Switch } from '../../../../components/Switch';
import { cn } from '../../../../../app/utils/cn';
import { useState } from 'react';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { CompanyService } from '../../../../../app/services/CompanyService';
import { Spinner } from '../../../../components/Loaders/Spinner';

interface CompanyRowProps {
  data: IGetCompanyReponse;
  onToggleStatus: () => void;
  onEdit: () => void;
}

export function CompanyRow({ data, onToggleStatus, onEdit }: CompanyRowProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggleStatus() {
    try {
      setIsLoading(true);

      if (data.active) {
        const { message } = await CompanyService.inactivateCompany(data.id);
        toast.success(message);
      } else {
        const { message } = await CompanyService.activateCompany(data.id);
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
    <tr className="border-b bg-white">
      <th scope="row" className="p-4 font-semibold">
        {data.name}
      </th>
      <td className="p-4">#{data.externalId}</td>
      <td className="p-4">{data.usersQty}</td>
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
