import { IconUserPlus } from "@tabler/icons-react";
import {
  IGetUserResponse,
  IUserPayload,
} from "../../../../../types/users";
import { Modal } from "../../../../components/Modal";
import { IUserFormRef, UserForm } from "../components/UserForm";
import { UserService } from "../../../../../app/services/UserService";
import { APIError } from "../../../../../app/errors/APIError";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { Button } from "../../../../components/Button";

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (user: IGetUserResponse) => void;
}

export function CreateUserModal({
  visible,
  onClose,
  onCreated,
}: CreateUserModalProps) {
  const [concluded, setConcluded] = useState(false);
  const userFormRef = useRef<IUserFormRef>(null);

  async function handleSubmit(payload: IUserPayload) {
    try {
      const userCreated: any = await UserService.createUser({
        email: payload.email,
        name: payload.email,
        role: payload.userRole?.value,
        companyId: payload.company?.id,
        externalId: Number(payload.company?.externalId),
        company: payload.company,
        idPapel: payload.idPapel,
      } as any)
      // const userCreated = (await UserService.managerCreateUser(
      //   payload,
      // )) as ICreateUserResponse;
      onCreated({
        ...userCreated,
        companies: payload.company
          ? [{ id: payload.company.id, name: payload.company.name }]
          : [],
      });

      toast.success("Usuário criado com sucesso!");

      setConcluded(true);
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
      afterClose={() => {
        setConcluded(false);
        userFormRef.current?.resetFields();
      }}
      title={concluded ? "Usuário Criado!" : "Novo Usuário"}
      description={
        concluded
          ? "Oriente seu usuário a entrar em seu e-mail cadastrado para finalizar o cadastro no portal."
          : "Adicione um novo usuário para ter acesso ao portal."
      }
    >
      {concluded ? (
        <Button className=" mx-auto mt-6 w-40" onClick={onClose}>
          Concluir
        </Button>
      ) : (
        <UserForm
          ref={userFormRef}
          onClose={onClose}
          onSubmit={handleSubmit}
          SubmitButtonIcon={IconUserPlus}
          submitButtonLabel="Criar"
        />
      )}
    </Modal>
  );
}
