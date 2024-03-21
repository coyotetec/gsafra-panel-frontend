import { FormEvent, forwardRef, useImperativeHandle, useState } from 'react';
import { ICompanyPayload } from '../../../../../types/company';
import { formErrorType } from '../../../../../types/global';
import { handleChangeInput } from '../../../../../app/utils/handleChangeInput';
import { Input } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { Icon } from '@tabler/icons-react';
import { companySchema } from '../schemas';
import { formatZodError } from '../../../../../app/utils/formatZodError';

interface CompanyFormProps {
  onClose: () => void;
  onSubmit: (company: ICompanyPayload) => Promise<void>;
  submitButtonLabel: string;
  SubmitButtonIcon: Icon;
}

export interface ICompanyFormRef {
  resetFields: () => void;
  setFieldsValue: (data: ICompanyPayload) => void;
}

export const CompanyForm = forwardRef<ICompanyFormRef, CompanyFormProps>(
  ({ onClose, onSubmit, submitButtonLabel, SubmitButtonIcon }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<formErrorType | null>(null);
    const [companyData, setCompanyData] = useState<ICompanyPayload>({
      name: '',
      code: '',
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setIsLoading(true);

      const companyValidation = companySchema.safeParse(companyData);

      if (!companyValidation.success) {
        setIsLoading(false);
        return setFormErrors(formatZodError(companyValidation.error));
      }

      setFormErrors(null);

      await onSubmit(companyData);

      setIsLoading(false);
    }

    useImperativeHandle(
      ref,
      () => ({
        resetFields: () => {
          setCompanyData({
            name: '',
            code: '',
          });
        },
        setFieldsValue: (data) => {
          setCompanyData(data);
        },
      }),
      [],
    );

    return (
      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          label="Nome"
          placeholder="Nome da empresa"
          name="name"
          value={companyData.name}
          onChange={(e) =>
            handleChangeInput<ICompanyPayload>(setCompanyData, e)
          }
          error={formErrors?.name}
        />
        <Input
          label="Código"
          placeholder="Código da empresa"
          prefix="#"
          name="code"
          value={companyData.code}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, '');

            handleChangeInput<ICompanyPayload>(setCompanyData, e);
          }}
          maxLength={6}
          error={formErrors?.code}
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

CompanyForm.displayName = 'CompanyForm';
