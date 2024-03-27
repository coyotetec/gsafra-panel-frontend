import {
  FormEvent,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Icon } from '@tabler/icons-react';
import { Button } from '../../../../../../../components/Button';
import { Input } from '../../../../../../../components/Input';
import { Select } from '../../../../../../../components/Select';
import { handleChangeInput } from '../../../../../../../../app/utils/handleChangeInput';
import { formatZodError } from '../../../../../../../../app/utils/formatZodError';
import { usePanelContext } from '../../../../../../../../app/hooks/usePanelContext';
import { userFormSchema } from './userFormSchema';
import { GsafraUserService } from '../../../../../../../../app/services/GsafraUserService';
import { APIError } from '../../../../../../../../app/errors/APIError';
import { IUserData } from '../NewUserModal/index';
import { IGetGsafraUserResponse } from '../../../../../../../../types/gsafraUser';
import {
  IGetUserResponse,
  UserRoleType,
} from '../../../../../../../../types/users';
import { FormErrorType } from '../../../../../../../../types/global';
import toast from 'react-hot-toast';

interface IUserRoleSelect {
  role: UserRoleType;
  label: string;
}
export interface IUserCompanySelect {
  id: string;
  name: string;
}

interface INewUserData {
  name: string;
  email: string;
}

export interface UserFormProps {
  onClose: () => void;
  onSubmit: (userData: IUserData) => void;
  submitButtonLabel: string;
  SubmitButtonIcon: Icon;
  typeForm: 'create' | 'update';
}

export interface IUserFormRef {
  resetFields: () => void;
  setFieldsValues: (data: IGetUserResponse) => void;
}

const roles: IUserRoleSelect[] = [
  { role: 'USER', label: 'Usuário' },
  { role: 'ADMIN', label: 'Administrador' },
];

export const UserForm = forwardRef(
  (
    {
      onClose,
      onSubmit,
      SubmitButtonIcon,
      submitButtonLabel,
      typeForm,
    }: UserFormProps,
    ref,
  ) => {
    const { userCompanies } = usePanelContext();

    const [isLoading, setIsLoading] = useState(false);
    const [gsafraUsersIsLoading, setGsafraUsersIsLoading] = useState(false);
    const [selectedGsafraUser, setSelectedGsafraUser] =
      useState<IGetGsafraUserResponse | null>(null);
    const [selectedUserRole, setSelectedUserRole] =
      useState<IUserRoleSelect | null>(null);
    const [selectedCompany, setSelectedCompany] =
      useState<IUserCompanySelect | null>(
        userCompanies && userCompanies.companies[0],
      );
    const [newUserData, setNewUserData] = useState<INewUserData>({
      email: '',
      name: '',
    });
    const [formErrors, setFormErrors] = useState<FormErrorType | null>(null);
    const [gsafraUsers, setGsafraUsers] = useState<IGetGsafraUserResponse[]>(
      [],
    );

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsLoading(true);

      const userData = {
        ...newUserData,
        role: selectedUserRole?.role,
        companyId: selectedCompany?.id,
        externalId: selectedGsafraUser?.id,
      };
      const validateData = userFormSchema.safeParse(userData);

      if (!validateData.success) {
        setIsLoading(false);
        return setFormErrors(formatZodError(validateData.error));
      }
      setFormErrors(null);

      await onSubmit({ ...userData, company: selectedCompany });
    }

    useEffect(() => {
      async function getGsafraUsers() {
        try {
          setGsafraUsersIsLoading(true);
          const gsafraUsers =
            selectedCompany &&
            (await GsafraUserService.getGsafraUsers(selectedCompany.id));
          gsafraUsers && setGsafraUsers(gsafraUsers);
        } catch (err) {
          onClose();
          if (err instanceof APIError) toast.error(err.message);
          setGsafraUsers([]);
        } finally {
          setGsafraUsersIsLoading(false);
        }
      }

      getGsafraUsers();
    }, [selectedCompany, onClose]);

    useEffect(() => {
      setNewUserData({
        name: selectedGsafraUser?.name || '',
        email: selectedGsafraUser?.email || '',
      });
    }, [selectedGsafraUser]);

    useImperativeHandle(
      ref,
      () => ({
        resetFields: () => {
          setNewUserData({ email: '', name: '' });
          setIsLoading(false);
          setSelectedCompany(null);
          setSelectedGsafraUser(null);
          setSelectedUserRole(null);
        },
        setFieldsValues: (data: IGetUserResponse) => {
          setNewUserData({
            name: data.name,
            email: data.email,
          });
          setSelectedCompany(data.companies[0]);
          setSelectedGsafraUser({
            id: data.externalId,
            name: data.name,
            email: data.email,
          });
          setSelectedUserRole(roles.find((r) => r.role === data.role) || null);
        },
      }),
      [],
    );

    return (
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        {userCompanies &&
          userCompanies.companies.length > 1 &&
          typeForm === 'create' && (
            <Select
              options={userCompanies.companies}
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
          options={gsafraUsers}
          label="Usuário no sistema"
          placeholder="Selecione um usuário"
          error={formErrors?.externalId}
          valueKey="id"
          labelKey="name"
          selected={selectedGsafraUser}
          setSelected={setSelectedGsafraUser}
          loading={gsafraUsersIsLoading}
        />

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

        <footer className="mx-auto mt-6 flex w-82 gap-2 text-center">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" loading={isLoading}>
            <SubmitButtonIcon />
            {submitButtonLabel}
          </Button>
        </footer>
      </form>
    );
  },
);

UserForm.displayName = 'UserForm';
