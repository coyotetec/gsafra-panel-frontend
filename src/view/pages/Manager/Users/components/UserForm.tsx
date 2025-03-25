import { Icon } from "@tabler/icons-react";
import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import toast from "react-hot-toast";
import { APIError } from "../../../../../app/errors/APIError";
import { useManager } from "../../../../../app/hooks/useManager";
import { CompanyService } from "../../../../../app/services/CompanyService";
import { GsafraPapelService } from "../../../../../app/services/GsafraPapel";
import { GsafraUserService } from "../../../../../app/services/GsafraUserService";
import { formatZodError } from "../../../../../app/utils/formatZodError";
import { handleChangeInput } from "../../../../../app/utils/handleChangeInput";
import { FormErrorType } from "../../../../../types/global";
import {
  IGetGsafraPaperResponse,
  IGetGsafraUserResponse,
} from "../../../../../types/gsafraPaper";
import { IUserPayload, IUserRole } from "../../../../../types/users";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { userSchema } from "../schemas";

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
  { value: "ADMIN", label: "Administrador" },
  { value: "USER", label: "Usuário Comum" },
  { value: "MANAGER", label: "Gerenciador" },
];

export const UserForm = forwardRef<IUserFormRef, UserFormProps>(
  ({ onClose, onSubmit, submitButtonLabel, SubmitButtonIcon }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [companiesIsLoading, setCompaniesIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrorType>(null);
    const [gsafraUsers, setGsafraUsers] = useState<IGetGsafraUserResponse[]>(
      [],
    );
    const [selectedPaper, setSelectedPaper] = useState<Omit<
      IGetGsafraPaperResponse,
      "DESCRICAO"
    > | null>(null);
    const [gsafraPapers, setGsafraPapers] = useState<IGetGsafraPaperResponse[]>(
      [],
    );
    const [userData, setUserData] = useState<any>({
      userRole: { value: "ADMIN", label: "Administrador" },
      company: undefined,
      gsafraUser: undefined,
      name: "",
      email: "",
      idPapel: undefined,
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

      await onSubmit({...userData, idPapel: selectedPaper?.ID});

      setIsLoading(false);
    }

    useImperativeHandle(
      ref,
      () => ({
        resetFields: () => {
          setUserData({
            userRole: { value: "ADMIN", label: "Administrador" },
            company: undefined,
            gsafraUser: undefined,
            name: "",
            email: "",
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
      if (!userData.company) return;
      async function getGsafraUsers() {
        try {
          const gsafraUsers = await GsafraPapelService.getGsafraPapel(
            userData?.company?.id,
          );
          setGsafraPapers(gsafraUsers);
        } catch (err) {
          onClose();
          if (err instanceof APIError) toast.error(err.message);
          setGsafraUsers([]);
        } finally {
        }
      }

      getGsafraUsers();
    }, [userData, onClose]);
    useEffect(() => {
      async function loadCompanies() {
        try {
          if (!companiesLoaded.current) {
            setCompaniesIsLoading(true);
            const companiesData = await CompanyService.getCompanies();

            setCompanies(companiesData);
            companiesLoaded.current = true;
          } else if (companyId) {
            setUserData((prevState: any) => ({
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
            if (!userData.company) {
              return;
            }

            const gsafraUsersData = await GsafraUserService.getGsafraUsers(
              userData.company.id,
            );

            setGsafraUsers(gsafraUsersData);
          } else if (gsafraUserId) {
            setUserData((prevState: any) => ({
              ...prevState,
              gsafraUser: gsafraUsers.find((user) => user.id === gsafraUserId),
            }));
          }
        } catch (err) {
          if (err instanceof APIError) {
            toast.error(err.message);
          }
        } finally {
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
            setUserData((prevState: any) => ({
              ...prevState,
              userRole: value,
              ...(value.value === "MANAGER" && {
                company: undefined,
                gsafraUser: undefined,
              }),
            }));
          }}
        />
        {userData.userRole?.value !== "MANAGER" && (
          <>
            <Select
              label="Empresa"
              placeholder="Selecione uma empresa"
              options={companies}
              labelKey="name"
              valueKey="id"
              selected={userData.company}
              setSelected={(value) => {
                setUserData((prevState: any) => ({
                  ...prevState,
                  company: value,
                }));
              }}
              loading={companiesIsLoading}
              error={formErrors?.company}
            />
            {gsafraPapers && gsafraPapers.length > 1 && (
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
            )}
          </>
        )}
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

UserForm.displayName = "UserForm";
