import { IconUserPlus } from '@tabler/icons-react';
import { Button } from '../../../../../components/Button';
import { Input } from '../../../../../components/Input';
import { Modal } from '../../../../../components/Modal';
import { Select } from '../../../../../components/Select';
import { FormEvent, useState } from 'react';
import { handleChangeInput } from '../../../../../../app/utils/handleChangeInput';
import { IGetUserCompaniesResponse } from '../../../../../../types/userCompanies';
import { newUserSchema } from './newUserSchema';
import { formErrorType } from '../../../../../../types/global';
import { formatZodError } from '../../../../../../app/utils/formatZodError';
import { UserService } from '../../../../../../app/services/UserService';
import {
  // GetUsersResponseType,
  UserRoleType,
} from '../../../../../../types/users';
import toast from 'react-hot-toast';
import { APIError } from '../../../../../../app/errors/APIError';

interface NewUserModalProps {
  visible: boolean;
  onClose: () => void;
  // updateUserState: (userData: GetUsersResponseType) => void;
  companies?: IGetUserCompaniesResponse[] | null;
}

interface INewUserData {
  name: string;
  email: string;
}

interface IUserRoleSelect {
  role: UserRoleType;
  label: string;
}

interface IExternalIdSelect {
  id: number;
  name: string;
}

interface ICompanyIdSelect {
  name: string;
  id: string;
}

const users: IExternalIdSelect[] = [
  { id: 1, name: 'Iran Adryan' },
  { id: 2, name: 'Caleb Lima' },
  { id: 3, name: 'João Pedro' },
  { id: 4, name: 'Maria Eduarda' },
  { id: 5, name: 'José Carlos' },
];

const roles: IUserRoleSelect[] = [
  { role: 'USER', label: 'Usuário' },
  { role: 'ADMIN', label: 'Administrador' },
];

export function NewUserModal({
  onClose,
  visible,
  companies,
}: NewUserModalProps) {
  const [selectedExternalId, setSelectedExternalId] =
    useState<IExternalIdSelect | null>(null);
  const [selectedUserRole, setSelectedUserRole] =
    useState<IUserRoleSelect | null>(null);
  const [selectedCompany, setSelectedCompany] =
    useState<ICompanyIdSelect | null>(null);
  const [newUserData, setNewUserData] = useState<INewUserData>({
    email: '',
    name: '',
  });
  const [formErrors, setFormErrors] = useState<formErrorType | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const userData = {
        ...newUserData,
        role: selectedUserRole?.role,
        companyId: selectedCompany?.id,
        externalId: selectedExternalId?.id,
      };
      const validateData = newUserSchema.safeParse(userData);

      if (!validateData.success) {
        return setFormErrors(formatZodError(validateData.error));
      }
      setFormErrors(null);

      await UserService.createUser(userData);

      setNewUserData({ email: '', name: '' });
      setSelectedCompany(null);
      setSelectedExternalId(null);
      setSelectedUserRole(null);
    } catch (err) {
      if (err instanceof APIError) toast.error(err.message);
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={() => {
        setNewUserData({ email: '', name: '' });
        setSelectedCompany(null);
        setSelectedExternalId(null);
        setSelectedUserRole(null);
        setFormErrors(null);
        onClose();
      }}
      title="Novo Usuário"
      description="Adicione um novo usuário para ter acesso ao portal"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          label="Nome"
          placeholder="Nome"
          name="name"
          error={formErrors?.name}
          type="text"
          value={newUserData.name}
          onChange={(event) =>
            handleChangeInput<INewUserData>(setNewUserData, event)
          }
        />
        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          error={formErrors?.email}
          name="email"
          type="email"
          value={newUserData.email}
          onChange={(event) => handleChangeInput(setNewUserData, event)}
        />

        {companies && companies.length !== 0 && (
          <Select
            options={companies}
            error={formErrors?.companyId}
            labelKey="name"
            valueKey="id"
            selected={selectedCompany}
            setSelected={setSelectedCompany}
            label="Empresa"
            placeholder="Selecione uma empresa"
          />
        )}

        <Select
          options={roles}
          label="Papel do usuário"
          placeholder="Selecione o papel do usuário"
          error={formErrors?.role}
          valueKey="role"
          labelKey="label"
          selected={selectedUserRole}
          setSelected={setSelectedUserRole}
        />

        <Select
          options={users}
          label="Usuário no sistema"
          placeholder="Selecione um usuário"
          error={formErrors?.externalId}
          valueKey="id"
          labelKey="name"
          selected={selectedExternalId}
          setSelected={setSelectedExternalId}
        />

        <footer className="mx-auto mt-6 flex w-82 gap-2 text-center">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button>
            <IconUserPlus />
            Criar
          </Button>
        </footer>
      </form>
    </Modal>
  );
}
