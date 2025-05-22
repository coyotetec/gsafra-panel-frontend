import { IconEdit } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { APIError } from '../../../../../app/errors/APIError';
import { CompanyService } from '../../../../../app/services/CompanyService';
import { cn } from '../../../../../app/utils/cn';
import { IGetCompanyResponse } from '../../../../../types/company';
import { Spinner } from '../../../../components/Loaders/Spinner';
import { Switch } from '../../../../components/Switch';

interface CompanyRowProps {
  data: IGetCompanyResponse;
  onToggleStatus: (event: any) => void;
  onEdit: (event: any) => void;
}

export function CompanyRow({ data, onToggleStatus, onEdit }: CompanyRowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function handleToggleStatus(event: ChangeEvent<HTMLInputElement>) {
    try {
      setIsLoading(true);

      if (data.active) {
        const { message } = await CompanyService.inactivateCompany(data.id);
        toast.success(message);
      } else {
        const { message } = await CompanyService.activateCompany(data.id);
        toast.success(message);
      }

      onToggleStatus(event);
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  const gotToCompanyDetail = (companyId: string) => {
    navigate(`/company/${companyId}`);
  }
  return (
    <tr className="border-b bg-white hover:bg-slate-100">
      <th scope="row" className="p-4 font-semibold cursor-pointer" onClick={() => gotToCompanyDetail(data.id)}>
        {data.name}
      </th>
      <td className="p-4 cursor-pointer" onClick={() => gotToCompanyDetail(data.id)}>{data.host}</td>
      <td className="p-4 cursor-pointer" onClick={() => gotToCompanyDetail(data.id)}>#{data.externalId}</td>
      <td className="p-4 cursor-pointer" onClick={() => gotToCompanyDetail(data.id)}>{data.usersQty}</td>
      <td className="p-4 cursor-pointer" onClick={() => gotToCompanyDetail(data.id)}>
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
          <Switch checked={data.active} onChange={handleToggleStatus} />
        )}
      </td>
    </tr>
  );
}
