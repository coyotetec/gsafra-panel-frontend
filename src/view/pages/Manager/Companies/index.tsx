import { IconEdit, IconPlus } from '@tabler/icons-react';
import { Switch } from '../../../components/Switch';
import { Button } from '../../../components/Button';
import { cn } from '../../../../app/utils/cn';

interface ICompany {
  name: string;
  code: string;
  usersQty: number;
  active: boolean;
}

const companiesMock: ICompany[] = [
  {
    name: 'Fazenda 1',
    code: '000001',
    usersQty: 21,
    active: true,
  },
  {
    name: 'Fazenda 2',
    code: '000002',
    usersQty: 22,
    active: true,
  },
  {
    name: 'Fazenda 3',
    code: '000003',
    usersQty: 23,
    active: false,
  },
  {
    name: 'Fazenda 4',
    code: '000004',
    usersQty: 24,
    active: false,
  },
];

export function Companies() {
  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-black-100 text-3xl font-bold">Empresas</h1>
          <p className="text-black-80">
            {companiesMock.length === 1
              ? '1 empresa encontrada'
              : `${companiesMock.length} empresas encontradas`}
          </p>
        </div>
        <Button className="w-56">
          <IconPlus />
          Nova Empresa
        </Button>
      </header>

      <table className="text-black-80 mt-5 w-full overflow-hidden rounded-xl text-left text-sm">
        <thead className="text-primary-500 bg-primary-40">
          <tr>
            <th scope="col" className="px-4 py-5 font-semibold">
              Nome
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Código
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Nº Usuários
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Status
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {companiesMock.map((company) => (
            <tr className="border-b bg-white" key={company.code}>
              <th scope="row" className="p-4 font-semibold">
                {company.name}
              </th>
              <td className="p-4">#{company.code}</td>
              <td className="p-4">{company.usersQty}</td>
              <td className="p-4">
                <span
                  className={cn(
                    'mr-2 inline-block h-2 w-2 rounded-full',
                    company.active ? 'bg-primary-300' : 'bg-red-500',
                  )}
                />
                {company.active ? 'Ativo' : 'Inativo'}
              </td>
              <td className="flex items-center gap-4 p-4">
                <button className="text-secondary-500">
                  <IconEdit size={20} />
                </button>
                <Switch />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
