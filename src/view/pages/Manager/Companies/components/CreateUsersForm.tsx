import { FormEvent, useState } from 'react';
import { IGetGsafraUserResponse } from '../../../../../types/gsafraUser';
import { Checkbox } from '../../../../components/Checkbox';
import { Input } from '../../../../components/Input';
import { cn } from '../../../../../app/utils/cn';
import { Button } from '../../../../components/Button';
import { IconUsersPlus } from '@tabler/icons-react';
import { gsafraUsersSchema } from '../schemas';
import { FormErrorType } from '../../../../../types/global';
import { UserService } from '../../../../../app/services/UserService';
import { ICreateUserResponse } from '../../../../../types/users';
import { IGetCompanyResponse } from '../../../../../types/company';
import { useManager } from '../../../../../app/hooks/useManager';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';

interface CreateUsersFormProps {
  users: IGetGsafraUserResponse[];
  company: IGetCompanyResponse | null;
  onClose: () => void;
  goNextStep: () => void;
}

interface IUserFormData extends IGetGsafraUserResponse {
  checked: boolean;
}

export function CreateUsersForm({
  users,
  company,
  onClose,
  goNextStep,
}: CreateUsersFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [usersFormData, setUsersFormData] = useState<IUserFormData[]>(
    users.map(({ id, name, email }) => ({
      id,
      name,
      email: email || '',
      checked: !!email,
    })),
  );
  const [formErrors, setFormErrors] = useState<FormErrorType>(null);
  const { setUsers, usersLoaded } = useManager();

  function handleChangeUserData(
    id: number,
    label: keyof IUserFormData,
    value: string | boolean,
  ) {
    setUsersFormData((prevState) =>
      prevState.map((user) =>
        user.id === id ? { ...user, [label]: value } : user,
      ),
    );
  }

  function handleToggleCheckAll(check: boolean) {
    setUsersFormData((prevState) =>
      prevState.map((user) => ({ ...user, checked: check })),
    );
  }

  function handleAddNewUsers(users: ICreateUserResponse[]) {
    if (usersLoaded.current) {
      setUsers((prevState) =>
        prevState.concat(
          users.map((user) => ({
            ...user,
            companies: company ? [{ id: company.id, name: company.name }] : [],
          })),
        ),
      );
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const checkedUsers = usersFormData.filter((user) => user.checked);

      const gsafraUsersValidation = gsafraUsersSchema.safeParse(checkedUsers);

      if (!gsafraUsersValidation.success) {
        const transformedErrors: FormErrorType = {};

        gsafraUsersValidation.error.issues.forEach((error) => {
          const key = `${checkedUsers[Number(error.path[0])].id}-email`;
          const value = error.message;
          transformedErrors[key] = value;
        });

        return setFormErrors(transformedErrors);
      }

      setFormErrors(null);

      const usersCreated = (await UserService.managerCreateUser(
        gsafraUsersValidation.data.map((user) => ({
          userRole: { value: 'USER', label: 'Usuário Comum' },
          company: company || undefined,
          name: user.name,
          email: user.email,
          gsafraUser: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        })),
      )) as ICreateUserResponse[];

      toast.success('Usuários criados com sucesso!');
      handleAddNewUsers(usersCreated);
      goNextStep();
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="mt-6" noValidate onSubmit={handleSubmit}>
      <Checkbox
        checked={usersFormData.every(({ checked }) => checked)}
        onChange={handleToggleCheckAll}
        label="Marcar todos"
        className="ml-0.5"
      />
      <div className="mt-2 flex max-h-[40vh] flex-col gap-4 overflow-auto p-0.5 pr-2">
        {usersFormData.map((user) => (
          <div className="flex items-center gap-2" key={user.id}>
            <Checkbox
              checked={user.checked}
              onChange={(value) =>
                handleChangeUserData(user.id, 'checked', value)
              }
            />
            <span
              className={cn(
                'text-sm font-semibold text-black/80',
                !user.checked && 'text-black/40 line-through',
              )}
            >
              {user.name}
            </span>
            <Input
              placeholder="E-mail do usuário"
              wrapperClass="flex-1"
              className="mt-0 h-10 text-sm"
              disabled={!user.checked}
              value={user.email}
              onChange={(e) =>
                handleChangeUserData(user.id, 'email', e.target.value)
              }
              error={formErrors ? formErrors[`${user.id}-email`] : undefined}
            />
          </div>
        ))}
      </div>
      <footer className="mx-auto mt-8 flex justify-center gap-2">
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
          <IconUsersPlus />
          Criar
        </Button>
      </footer>
    </form>
  );
}
