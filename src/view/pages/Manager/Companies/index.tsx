import { IconPlus } from '@tabler/icons-react';
import { Button } from '../../../components/Button';
import { useEffect, useState } from 'react';
import { CreateCompanyModal } from './modals/createCompanyModal';
import { CompanyService } from '../../../../app/services/CompanyService';
import { IGetCompanyResponse } from '../../../../types/company';
import { APIError } from '../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { CompanyRow } from './components/CompanyRow';
import { SkeletonCompaniesTable } from '../../../components/Loaders/SkeletonCompaniesTable';
import { EditCompanyModal } from './modals/EditCompanyModal';

export function Companies() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<IGetCompanyResponse[]>([]);
  const [selectedCompany, setSelectedCompany] =
    useState<IGetCompanyResponse | null>(null);

  function handleToggleCompanyStatus(companyId: string) {
    setCompanies((prevState) =>
      prevState.map((company) =>
        company.id === companyId
          ? { ...company, active: !company.active }
          : company,
      ),
    );
  }

  function handleAddNewCompany(company: IGetCompanyResponse) {
    setCompanies((prevState) => prevState.concat(company));
  }

  function handleUpdateCompany(company: IGetCompanyResponse) {
    setCompanies((prevState) =>
      prevState.map((item) => (item.id === company.id ? company : item)),
    );
  }

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const companiesData = await CompanyService.getCompanies();

        setCompanies(companiesData);
      } catch (err) {
        if (err instanceof APIError) {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <EditCompanyModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        company={selectedCompany}
        onEdited={handleUpdateCompany}
      />
      <CreateCompanyModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreated={handleAddNewCompany}
      />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black-100">Empresas</h1>
          <p className="text-black-80">
            {companies.length === 1
              ? '1 empresa encontrada'
              : `${companies.length} empresas encontradas`}
          </p>
        </div>
        <Button className="w-56" onClick={() => setCreateModalVisible(true)}>
          <IconPlus />
          Nova Empresa
        </Button>
      </header>

      <table className="mt-5 w-full overflow-hidden rounded-xl text-left text-sm text-black-80">
        <thead className="bg-primary-40 text-primary-500">
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
          {isLoading ? (
            <SkeletonCompaniesTable />
          ) : (
            companies.map((company) => (
              <CompanyRow
                key={company.id}
                data={company}
                onToggleStatus={() => handleToggleCompanyStatus(company.id)}
                onEdit={() => {
                  setSelectedCompany(company);
                  setEditModalVisible(true);
                }}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
