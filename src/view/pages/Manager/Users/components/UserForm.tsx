import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { IGetGsafraUserResponse } from '../../../../../types/gsafraUser';
import { IUserPayload, IUserRole } from '../../../../../types/users';
import { CompanyService } from '../../../../../app/services/CompanyService';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { GsafraUserService } from '../../../../../app/services/GsafraUserService';
import { Select } from '../../../../components/Select';
import { Input } from '../../../../components/Input';
import { handleChangeInput } from '../../../../../app/utils/handleChangeInput';
import { Button } from '../../../../components/Button';
import { Icon } from '@tabler/icons-react';
import { userSchema } from '../schemas';
import { formatZodError } from '../../../../../app/utils/formatZodError';
import { FormErrorType } from '../../../../../types/global';
import { useManager } from '../../../../../app/hooks/useManager';

interface UserFormProps {
  onClose: () => void;
  onSubmit: (user: IUserPayload) => Promise<void>;
  submitButtonLabel: string;
  SubmitButtonIcon: Icon;
}

interface ISetFieldsData {
  name: string;
  email: string;
  userRole?: IUserRole;
  companyId?: string;
  gsafraUserId?: number;
}

export interface IUserFormRef {
  resetFields: () => void;
  setFieldsValues: (data: ISetFieldsData) => void;
}

export const userRoles: IUserRole[] = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'USER', label: 'Usuário Comum' },
  { value: 'MANAGER', label: 'Gerenciador' },
];

export const UserForm = forwardRef<IUserFormRef, UserFormProps>(
  ({ onClose, onSubmit, submitButtonLabel, SubmitButtonIcon }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [companiesIsLoading, setCompaniesIsLoading] = useState(false);
    const [gsafraUsersIsLoading, setGsafraUsersIsLoading] = useState(true);
    const [formErrors, setFormErrors] = useState<FormErrorType>(null);
    const [gsafraUsers, setGsafraUsers] = useState<IGetGsafraUserResponse[]>(
      [],
    );
    const [userData, setUserData] = useState<IUserPayload>({
      userRole: { value: 'ADMIN', label: 'Administrador' },
      company: undefined,
      gsafraUser: undefined,
      name: '',
      email: '',
    });
    const [companyId, setCompanyId] = useState<string | undefined>();
    const [gsafraUserId, setGsafraUserId] = useState<number | undefined>();
    const { companies, companiesLoaded, setCompanies } = useManager();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsLoading(true);

      const userValidation = userSchema.safeParse(userData);

      if (!userValidation.success) {
        setIsLoading(false);
        return setFormErrors(formatZodError(userValidation.error));
      }

      setFormErrors(null);

      await onSubmit(userData);

      setIsLoading(false);
    }

    useImperativeHandle(
      ref,
      () => ({
        resetFields: () => {
          setUserData({
            userRole: { value: 'ADMIN', label: 'Administrador' },
            company: undefined,
            gsafraUser: undefined,
            name: '',
            email: '',
          });
        },
        setFieldsValues: (data) => {
          setUserData({
            name: data.name,
            email: data.email,
            userRole: data.userRole,
          });
          setCompanyId(data.companyId);
          setGsafraUserId(data.gsafraUserId);
        },
      }),
      [],
    );

    useEffect(() => {
      async function loadCompanies() {
        try {
          if (!companiesLoaded.current) {
            setCompaniesIsLoading(true);
            const companiesData = await CompanyService.getCompanies();

            setCompanies(companiesData);
            companiesLoaded.current = true;
          } else if (companyId) {
            setUserData((prevState) => ({
              ...prevState,
              company: companies.find((company) => company.id === companyId),
            }));
          }
        } catch (err) {
          if (err instanceof APIError) {
            toast.error(err.message);
          }
        } finally {
          setCompaniesIsLoading(false);
        }
      }

      loadCompanies();
    }, [companies, companiesLoaded, companyId, setCompanies]);

    useEffect(() => {
      async function loadGsafraUsers() {
        try {
          if (gsafraUsers.length === 0) {
            setGsafraUsersIsLoading(true);

            if (!userData.company) {
              return;
            }

            const gsafraUsersData = await GsafraUserService.getGsafraUsers(
              userData.company.id,
            );

            setGsafraUsers(gsafraUsersData);
          } else if (gsafraUserId) {
            setUserData((prevState) => ({
              ...prevState,
              gsafraUser: gsafraUsers.find((user) => user.id === gsafraUserId),
            }));
          }
        } catch (err) {
          if (err instanceof APIError) {
            toast.error(err.message);
          }
        } finally {
          setGsafraUsersIsLoading(false);
        }
      }

      loadGsafraUsers();
    }, [userData.company, gsafraUsers, gsafraUserId]);

    return (
      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={handleSubmit}
        noValidate
      >
        <Select
          label="Papel de Usuário"
          placeholder="Selecione um papel"
          options={userRoles}
          labelKey="label"
          valueKey="value"
          selected={userData.userRole}
          setSelected={(value) => {
            setUserData((prevState) => ({
              ...prevState,
              userRole: value,
              ...(value.value === 'MANAGER' && {
                company: undefined,
                gsafraUser: undefined,
              }),
            }));
          }}
        />
        {userData.userRole?.value !== 'MANAGER' && (
          <>
            <Select
              label="Empresa"
              placeholder="Selecione uma empresa"
              options={companies}
              labelKey="name"
              valueKey="id"
              selected={userData.company}
              setSelected={(value) => {
                setUserData((prevState) => ({
                  ...prevState,
                  company: value,
                }));
              }}
              loading={companiesIsLoading}
              error={formErrors?.company}
            />
            <Select
              label="Usuário no  Sistema"
              placeholder="Selecione um usuário"
              options={gsafraUsers}
              labelKey="name"
              valueKey="id"
              selected={userData.gsafraUser}
              setSelected={(value) => {
                setUserData((prevState) => ({
                  ...prevState,
                  gsafraUser: value,
                  name: value.name,
                  email: value.email || '',
                }));
              }}
              loading={gsafraUsersIsLoading}
              error={formErrors?.gsafraUser}
            />
          </>
        )}
        <Input
          label="Nome"
          placeholder="Nome do usuário"
          name="name"
          value={userData.name}
          onChange={(e) => handleChangeInput<IUserPayload>(setUserData, e)}
          error={formErrors?.name}
        />
        <Input
          label="E-mail"
          placeholder="E-mail do usuário"
          name="email"
          value={userData.email}
          onChange={(e) => handleChangeInput<IUserPayload>(setUserData, e)}
          error={formErrors?.email}
        />

        <footer className="mx-auto mt-5 flex justify-center gap-2">
          <Button
            type="button"
            variant="secondary"
            className="w-40"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="w-40"
            loading={isLoading}
            disabled={isLoading}
          >
            <SubmitButtonIcon />
            {submitButtonLabel}
          </Button>
        </footer>
      </form>
    );
  },
);

UserForm.displayName = 'UserForm';
