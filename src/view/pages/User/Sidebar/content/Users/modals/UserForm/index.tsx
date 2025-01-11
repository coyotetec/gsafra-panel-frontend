import {
  FormEvent,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Icon } from "@tabler/icons-react";
import { Button } from "../../../../../../../components/Button";
import { Input } from "../../../../../../../components/Input";
import { Select } from "../../../../../../../components/Select";
import { handleChangeInput } from "../../../../../../../../app/utils/handleChangeInput";
import { formatZodError } from "../../../../../../../../app/utils/formatZodError";
import { usePanelContext } from "../../../../../../../../app/hooks/usePanelContext";
import { userFormSchema } from "./userFormSchema";
import { APIError } from "../../../../../../../../app/errors/APIError";
import { IUserData } from "../NewUserModal/index";
import {
  IGetGsafraPaperResponse,
  IGetGsafraUserResponse,
} from "../../../../../../../../types/gsafraPaper";
import {
  IGetUserResponse,
  UserRoleType,
} from "../../../../../../../../types/users";
import { FormErrorType } from "../../../../../../../../types/global";
import toast from "react-hot-toast";
import { GsafraPapelService } from "../../../../../../../../app/services/GsafraPapel";

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
  typeForm: "create" | "update";
}

export interface IUserFormRef {
  resetFields: () => void;
  setFieldsValues: (data: IGetUserResponse) => void;
}

const roles: IUserRoleSelect[] = [
  { role: "USER", label: "Usuário" },
  { role: "ADMIN", label: "Administrador" },
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
    const [selectedPaper, setSelectedPaper] = useState<Omit<
      IGetGsafraPaperResponse,
      "DESCRICAO"
    > | null>(null);
    const [newUserData, setNewUserData] = useState<INewUserData>({
      email: "",
      name: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrorType | null>(null);
    const [gsafraPapers, setGsafraPapers] = useState<IGetGsafraPaperResponse[]>(
      [],
    );

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsLoading(true);
      const userData = {
        ...newUserData,
        role: selectedUserRole?.role,
        name: newUserData.email,
        idPapel: selectedPaper?.ID,
        companyId: selectedCompany?.id,
        externalId: Number(userCompanies?.companies[0].externalId),
      };
      const validateData = userFormSchema.safeParse(userData);

      if (!validateData.success) {
        setIsLoading(false);
        return setFormErrors(formatZodError(validateData.error));
      }
      setFormErrors(null);

      await onSubmit({ ...userData, company: selectedCompany });
      setIsLoading(false);
    }

    useEffect(() => {
      async function getGsafraUsers() {
        try {
          setGsafraUsersIsLoading(true);
          const gsafraUsers = await GsafraPapelService.getGsafraPapel(
            selectedCompany?.id,
          );
          setGsafraPapers(gsafraUsers);
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
        name: selectedGsafraUser?.name || "",
        email: selectedGsafraUser?.email || "",
      });
    }, [selectedGsafraUser]);

    useImperativeHandle(
      ref,
      () => ({
        resetFields: () => {
          setNewUserData({ email: "", name: "" });
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
          typeForm === "create" && (
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
          options={gsafraPapers}
          error={formErrors?.companyId}
          labelKey="NOME"
          valueKey="ID"
          selected={selectedPaper}
          setSelected={setSelectedPaper}
          label="Papel usuário app"
          placeholder="Selecione o papel do usúario no app"
        />
        <Select
          options={roles}
          label="Papel do usuário web"
          placeholder="Selecione o papel do usuário web"
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

UserForm.displayName = "UserForm";
