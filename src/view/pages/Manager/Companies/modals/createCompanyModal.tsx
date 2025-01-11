import { Modal } from "../../../../components/Modal";
import { APIError } from "../../../../../app/errors/APIError";
import toast from "react-hot-toast";
import {
  ICompanyPayload,
  IGetCompanyResponse,
} from "../../../../../types/company";
import { CompanyService } from "../../../../../app/services/CompanyService";
import { CompanyForm, ICompanyFormRef } from "../components/CompanyForm";
import { useRef, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { CreateUsersForm } from "../components/CreateUsersForm";
import { GsafraUserService } from "../../../../../app/services/GsafraUserService";
import { IGetGsafraUserResponse } from "../../../../../types/gsafraPaper";
import { Button } from "../../../../components/Button";

interface CreateCompanyModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (company: IGetCompanyResponse) => void;
}

export function CreateCompanyModal({
  visible,
  onClose,
  onCreated,
}: CreateCompanyModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [gsafraUsers, setGsafraUsers] = useState<IGetGsafraUserResponse[]>([]);
  const [company, setCompany] = useState<IGetCompanyResponse | null>(null);
  const companyFormRef = useRef<ICompanyFormRef>(null);
  const steps = [
    {
      title: "Nova Empresa",
      description: "Adicione uma nova empresa ao portal.",
    },
    {
      title: "Empresa Criada!",
      description: `A empresa ${company?.name} (#${company?.externalId}) foi criada com sucesso!`,
    },
    {
      title: "Encontramos Usuários",
      description:
        "Esses são os usuários que já estão criados no sistema selecione os que deseja adicionar ao portal.",
    },
    {
      title: "Usuários Criados!",
      description:
        "Oriente seus usuários a entrarem em seus e-mails cadastrados para finalizar o cadastro no portal.",
    },
  ];

  async function loadGsafraUsers(companyId: string) {
    setIsLoading(true);

    const gsafraUsersData = await GsafraUserService.getGsafraUsers(companyId);

    setGsafraUsers(gsafraUsersData);

    if (gsafraUsersData.length === 0) {
      onClose();
    } else {
      setCurrentStep(2);
    }

    setIsLoading(false);
  }

  async function handleSubmit(payload: ICompanyPayload) {
    try {
      const companyCreated = await CompanyService.createCompany(payload);

      onCreated({ ...companyCreated, usersQty: 0 });
      setCompany({ ...companyCreated, usersQty: 0 });

      setCurrentStep(1);
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    }
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={steps[currentStep].title}
      description={steps[currentStep].description}
      afterClose={() => {
        setCurrentStep(0);
        setCompany(null);
        setGsafraUsers([]);
        companyFormRef.current?.resetFields();
      }}
    >
      {currentStep === 0 && (
        <CompanyForm
          ref={companyFormRef}
          onClose={onClose}
          onSubmit={handleSubmit}
          SubmitButtonIcon={IconPlus}
          submitButtonLabel="Criar"
        />
      )}
      {currentStep === 1 && (
        <>
          <div className="mt-3 flex flex-col items-center justify-center rounded-md bg-gray-400 p-2 text-gray-600">
            <span className="text-sm">Senha do Mobile:</span>
            <span className="font-semibold">{company?.password}</span>
          </div>
          <footer className="mx-auto mt-5 flex justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              className="w-40"
              onClick={onClose}
              disabled={isLoading}
            >
              Concluir
            </Button>
            <Button
              type="submit"
              className="w-40"
              onClick={() => loadGsafraUsers(company!.id)}
              loading={isLoading}
              disabled={isLoading}
            >
              Buscar Usuários
            </Button>
          </footer>
        </>
      )}
      {currentStep === 2 && (
        <CreateUsersForm
          users={gsafraUsers}
          onClose={onClose}
          company={company}
          goNextStep={() => setCurrentStep(2)}
        />
      )}
      {currentStep === 3 && (
        <Button className=" mx-auto mt-6 w-40" onClick={onClose}>
          Concluir
        </Button>
      )}
    </Modal>
  );
}
