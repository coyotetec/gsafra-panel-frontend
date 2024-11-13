import { IconFilterDiscount, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { APIError } from "../../../../app/errors/APIError";
import { useManager } from "../../../../app/hooks/useManager";
import { CompanyService } from "../../../../app/services/CompanyService";
import { UserService } from "../../../../app/services/UserService";
import { orderUsersByCompany } from "../../../../app/utils/orderUserssByCOmpany";
import { IGetUserResponse } from "../../../../types/users";
import { Button } from "../../../components/Button";
import { SkeletonUsersTable } from "../../../components/Loaders/SkeletonUsersTable";
import { Select } from "../../../components/Select";
import { UserRow } from "./components/UserRow";
import { CreateUserModal } from "./modals/createUserModal";
import { EditUserModal } from "./modals/EditUserModal";

export function Users() {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IGetUserResponse | null>(
    null,
  );
  const [companies, setCompanies] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedStatus, setSelectedStatus] = useState<{
    value: string;
    label: string;
  }>({
    value: "active",
    label: "ativos",
  });
  const [selectedCompanies, setSelectedCompanies] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const { users, setUsers, usersLoaded } = useManager();
  const [tempUsers, setTempUsers] = useState(users);

  function handleToggleUserStatus(userId: string) {
    setUsers((prevState) => {
      const newState = [...prevState];

      const response = newState.map((user) =>
        user.id === userId ? { ...user, active: !user.active } : user,
      );
      return response;
    });
  }
  function handleAddNewUser(user: IGetUserResponse) {
    setUsers((prevState) => prevState.concat(user));
  }
  function handleUpdateUser(user: IGetUserResponse) {
    setUsers((prevState) =>
      prevState.map((item) => (item.id === user.id ? user : item)),
    );
  }
  function filterUsers() {
    let filteredUsers = users;
    if (selectedStatus.value !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        selectedStatus.value === "active" ? user.active : !user.active,
      );
    }
    if (selectedCompanies?.value && selectedCompanies.value !== "all") {
      filteredUsers = filteredUsers.filter((user) =>
        user.companies.some(
          (company) => company.id === selectedCompanies.value,
        ),
      );
    }
    setTempUsers(filteredUsers);
  }
  async function loadCompanies() {
    const companies = await CompanyService.getCompanies();
    const treatCompanies = companies
      .filter((item) => item.active)
      .map((item) => ({
        value: item.id,
        label: item.name,
      }));
    setCompanies(treatCompanies);
  }

  useEffect(() => {
    filterUsers();
  }, [users, selectedStatus, selectedCompanies]);
  useEffect(() => {
    async function loadData() {
      try {
        if (!usersLoaded.current) {
          setIsLoading(true);
          const usersData = await UserService.getUsers();
          loadCompanies();
          setUsers(orderUsersByCompany(usersData));
          setTempUsers(
            orderUsersByCompany(usersData).filter((item) => item.active),
          );
          usersLoaded.current = true;
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
  }, [setUsers, usersLoaded]);
  useEffect(() => {
    loadCompanies();
  }, [users]);

  return (
    <>
      <EditUserModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onEdited={handleUpdateUser}
        user={selectedUser}
      />
      <CreateUserModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreated={handleAddNewUser}
      />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black-100">Usuários</h1>
          <p className="text-black-80">
            {tempUsers.length === 1
              ? "1 usuário encontrado"
              : `${tempUsers.length} usuários encontrados`}
          </p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button className="w-56" onClick={() => setCreateModalVisible(true)}>
            <IconPlus />
            Novo Usuário
          </Button>
        </div>
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
        <div className="w-[240px] ">
          <Select
            prefix="Empresa:"
            options={[{ value: "all", label: "Todos" }, ...companies]}
            valueKey="value"
            labelKey="label"
            isSecondary
            selected={selectedCompanies}
            setSelected={setSelectedCompanies}
          />
        </div>
      </div>

      <table className="mt-5 w-full overflow-hidden rounded-xl text-left text-sm text-black-80">
        <thead className="bg-primary-40 text-primary-500">
          <tr>
            <th scope="col" className="w-[26%] px-4 py-5 font-semibold">
              Nome
            </th>
            <th scope="col" className="w-[26%] px-4 py-5 font-semibold">
              Empresa
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Papel
            </th>
            <th scope="col" className="flex w-[20%] px-4 py-5 font-semibold ">
              Status <IconFilterDiscount size={12} />
            </th>
            <th scope="col" className="w-[16%] px-4 py-5 font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <SkeletonUsersTable />
          ) : (
            tempUsers.map((user) => (
              <UserRow
                key={user.id}
                data={user}
                onToggleStatus={() => handleToggleUserStatus(user.id)}
                onEdit={() => {
                  setSelectedUser(user);
                  setEditModalVisible(true);
                }}
              />
            ))
          )}
          {!isLoading && tempUsers.length === 0 && (
            <tr className="border-b bg-white">
              <td
                colSpan={5}
                className="max-w-[0] truncate p-4 text-center font-semibold"
              >
                Nenhum usuário cadastrada, comece criando uma!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
