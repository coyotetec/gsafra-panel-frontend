import { IconPlus } from "@tabler/icons-react";
import { Button } from "../../../components/Button";
import { useEffect, useState } from "react";
import { CreateCompanyModal } from "./modals/createCompanyModal";
import { CompanyService } from "../../../../app/services/CompanyService";
import { IGetCompanyResponse } from "../../../../types/company";
import { APIError } from "../../../../app/errors/APIError";
import toast from "react-hot-toast";
import { CompanyRow } from "./components/CompanyRow";
import { SkeletonCompaniesTable } from "../../../components/Loaders/SkeletonCompaniesTable";
import { EditCompanyModal } from "./modals/EditCompanyModal";
import { useManager } from "../../../../app/hooks/useManager";
import { Select } from "../../../components/Select";

export function Companies() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<IGetCompanyResponse | null>(null);
  const { companies, setCompanies, companiesLoaded } = useManager();
  const [selectedStatus, setSelectedStatus] = useState<{
    value: string;
    label: string;
  }>({
    value: "active",
    label: "ativos",
  });
  const [tempCompanies, setTempCompanies] = useState(companies);

  function handleToggleCompanyStatus(companyId: string) {
    setCompanies((prevState) =>
      prevState.map((company) =>
        company.id === companyId
          ? { ...company, active: !company.active }
          : company,
      ),
    );
  }
  function filterCompanies() {
    let filteredUsers = companies;
    if (selectedStatus.value !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        selectedStatus.value === "active" ? user.active : !user.active,
      );
    }

    setTempCompanies(filteredUsers);
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
    filterCompanies();
  }, [companies, selectedStatus]);
  useEffect(() => {
    async function loadData() {
      try {
        if (!companiesLoaded.current) {
          setIsLoading(true);
          const companiesData = await CompanyService.getCompanies();

          setCompanies(companiesData);
          companiesLoaded.current = true;
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
  }, [companiesLoaded, setCompanies]);

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
            {tempCompanies.length === 1
              ? "1 empresa encontrada"
              : `${tempCompanies.length} empresas encontradas`}
          </p>
        </div>
        <Button className="w-56" onClick={() => setCreateModalVisible(true)}>
          <IconPlus />
          Nova Empresa
        </Button>
      </header>
      <div className="mt-4 flex w-full flex-row gap-2">
        <div className="w-[240px]">
          <Select
            prefix="Status:"
            options={[
              {
                value: "all",
                label: "Todos",
              },
              {
                value: "inactive",
                label: "Inativo",
              },
              {
                value: "active",
                label: "Ativo",
              },
            ]}
            valueKey="value"
            labelKey="label"
            isSecondary
            selected={selectedStatus}
            setSelected={setSelectedStatus}
          />
        </div>
      </div>
      <table className="mt-5 w-full overflow-hidden rounded-xl text-left text-sm text-black-80">
        <thead className="bg-primary-40 text-primary-500">
          <tr>
            <th scope="col" className="px-4 py-5 font-semibold">
              Nome
            </th>
            <th scope="col" className="w-[14%] px-4 py-5 font-semibold">
              Servidor
            </th>
            <th scope="col" className="w-[14%] px-4 py-5 font-semibold">
              Código
            </th>
            <th scope="col" className="w-[14%] px-4 py-5 font-semibold">
              Nº Usuários
            </th>
            <th scope="col" className="w-[14%] px-4 py-5 font-semibold">
              Status
            </th>
            <th scope="col" className="w-[14%] px-4 py-5 font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonCompaniesTable />
          ) : (
            tempCompanies.map((company) => (
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
          {!isLoading && tempCompanies.length === 0 && (
            <tr className="border-b bg-white">
              <td
                colSpan={6}
                className="max-w-[0] truncate p-4 text-center font-semibold"
              >
                Nenhuma empresa cadastrada, comece criando uma!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
