import { Icon, IconX } from '@tabler/icons-react';
import { Checkbox } from '../../../../components/Checkbox';
import { Input } from '../../../../components/Input';
import { TextArea } from '../../../../components/TextArea';
import { Button } from '../../../../components/Button';
import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { INotificationPayload } from '../../../../../types/notification';
import { Select } from '../../../../components/Select';
import { CompanyService } from '../../../../../app/services/CompanyService';
import { APIError } from '../../../../../app/errors/APIError';
import toast from 'react-hot-toast';
import { IGetCompanyReponse } from '../../../../../types/company';
import { notificationSchema } from '../schemas';
import { formatZodError } from '../../../../../app/utils/formatZodError';
import { FormErrorType } from '../../../../../types/global';
import { handleChangeInput } from '../../../../../app/utils/handleChangeInput';

interface NotificationFormProps {
  onClose: () => void;
  onSubmit: (notification: INotificationPayload) => Promise<void>;
  submitButtonLabel: string;
  SubmitButtonIcon: Icon;
}

export interface INotificationFormRef {
  resetFields: () => void;
  setFieldsValues: (data: INotificationPayload) => void;
}

export const NotificationForm = forwardRef<
  INotificationFormRef,
  NotificationFormProps
>(({ onClose, onSubmit, submitButtonLabel, SubmitButtonIcon }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [companies, setCompanies] = useState<IGetCompanyReponse[]>([]);
  const [formErrors, setFormErrors] = useState<FormErrorType>(null);
  const [selectedCompany, setSelectedCompany] = useState<
    IGetCompanyReponse | undefined
  >(undefined);
  const [notificationData, setNotificationData] =
    useState<INotificationPayload>({
      title: '',
      body: '',
      allCompanies: true,
      selectedCompanies: [],
    });

  function handleAddSelectedCompany(company: IGetCompanyReponse) {
    const companyIncluded = notificationData.selectedCompanies.find(
      (item) => item.id === company.id,
    );

    if (!companyIncluded) {
      setNotificationData((prevState) => ({
        ...prevState,
        selectedCompanies: prevState.selectedCompanies.concat(company),
      }));
    }
  }

  function handleRemoveSelectedCompany(id: string) {
    setNotificationData((prevState) => ({
      ...prevState,
      selectedCompanies: prevState.selectedCompanies.filter(
        (item) => item.id !== id,
      ),
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const notificationValidation =
      notificationSchema.safeParse(notificationData);

    if (!notificationValidation.success) {
      setIsLoading(false);
      return setFormErrors(formatZodError(notificationValidation.error));
    }

    setFormErrors(null);

    await onSubmit(notificationData);

    setIsLoading(false);
  }

  useImperativeHandle(
    ref,
    () => ({
      resetFields: () => {
        setNotificationData({
          title: '',
          body: '',
          allCompanies: true,
          selectedCompanies: [],
        });
      },
      setFieldsValues: (data) => {
        setNotificationData(data);
      },
    }),
    [],
  );

  useEffect(() => {
    async function loadData() {
      try {
        setIsDataLoading(true);
        const companiesData = await CompanyService.getCompanies();

        if (companiesData) {
          setCompanies(companiesData);
        }
      } catch (err) {
        if (err instanceof APIError) {
          toast.error(err.message);
        }
      } finally {
        setIsDataLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <form
      className="mt-6 flex flex-col gap-3"
      onSubmit={handleSubmit}
      noValidate
    >
      <Input
        label="Título"
        placeholder="Título da notificação"
        name="title"
        value={notificationData.title}
        onChange={(e) =>
          handleChangeInput<INotificationPayload>(setNotificationData, e)
        }
        error={formErrors?.title}
      />
      <TextArea
        label="Corpo"
        placeholder="Corpo da notificação"
        name="body"
        value={notificationData.body}
        onChange={(e) =>
          handleChangeInput<INotificationPayload>(setNotificationData, e)
        }
        error={formErrors?.body}
      />
      <Checkbox
        checked={notificationData.allCompanies}
        name="all-companies"
        label="Todas as empresas"
        onChange={(value) => {
          setSelectedCompany(undefined);
          setNotificationData((prevState) => ({
            ...prevState,
            allCompanies: value,
            selectedCompanies: [],
          }));
        }}
      />
      {!notificationData.allCompanies && (
        <>
          <Select
            loading={isDataLoading}
            label="Empresas"
            placeholder="Selecione uma ou mais empresas"
            options={companies}
            valueKey="id"
            labelKey="name"
            selected={selectedCompany}
            setSelected={(value) => {
              setSelectedCompany(value);
              handleAddSelectedCompany(value);
            }}
          />
          <div className="-mt-1 flex flex-wrap gap-1">
            {notificationData.selectedCompanies.map((company) => (
              <span
                key={company.id}
                className="flex items-center gap-1 rounded-full bg-primary-40 px-2 py-1.5 text-sm text-primary-600"
              >
                {company.name}
                <button
                  type="button"
                  className="rounded-full outline-none hover:bg-primary-50"
                  onClick={() => handleRemoveSelectedCompany(company.id)}
                >
                  <IconX size={16} />
                </button>
              </span>
            ))}
          </div>
          {formErrors?.selectedCompanies && (
            <span className="ml-2 mt-1 text-xs text-red-500">
              {formErrors.selectedCompanies}
            </span>
          )}
        </>
      )}
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
});

NotificationForm.displayName = 'NotificationForm';
