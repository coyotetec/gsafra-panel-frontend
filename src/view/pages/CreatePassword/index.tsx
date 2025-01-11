import { IconPasswordUser } from "@tabler/icons-react";
import sojaImg from "../../../assets/images/soja.webp";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logos/Logo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { handleChangeInput } from "../../../app/utils/handleChangeInput";
import { createPasswordSchema } from "./schema";
import { FormErrorType } from "../../../types/global";
import { formatZodError } from "../../../app/utils/formatZodError";
import { AuthService } from "../../../app/services/AuthService";
import toast from "react-hot-toast";
import { APIError } from "../../../app/errors/APIError";

interface IFormData {
  password: string;
  confirmPassword: string;
}

export function CreatePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [userFirebirdId, setUserFirebirdId] = useState<string>();
  const [companyId, setCompanyId] = useState<string>();
  const [token, setToken] = useState<string | undefined>();
  const [formData, setFormData] = useState<IFormData>({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrorType>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!userId) {
        return;
      }

      const createPasswordValidation = createPasswordSchema.safeParse(formData);

      if (!createPasswordValidation.success) {
        setIsLoading(false);
        return setFormErrors(formatZodError(createPasswordValidation.error));
      }

      setFormErrors(null);

      const { message } = await AuthService.resetPassword({
        password: createPasswordValidation.data.password,
        userId,
        firebirdId: userFirebirdId,
        companyId,
        token,
      });

      toast.success(message);
      navigate("/login", {
        replace: true,
      });
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const u = searchParams.get("u");
    const t = searchParams.get("t");
    const f = searchParams.get("f");
    const c = searchParams.get("c");

    if (u) {
      setUserId(u);
    }

    if (t) {
      setToken(t);
    }
    if (f) {
      setUserFirebirdId(f);
    }
    if (c) {
      setCompanyId(c);
    }
  }, [searchParams]);

  return (
    <section className="grid max-h-screen grid-cols-init justify-center gap-4 bg-white p-4">
      <img
        src={sojaImg}
        alt="plantação"
        className="h-calc-img w-full rounded-3xl object-cover"
      />

      <div className="flex flex-col items-center justify-center">
        <Logo />
        <h2 className="text-2xl font-bold">Crie a sua senha</h2>

        <form
          className="mt-6 flex w-full max-w-104 flex-col gap-3"
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            placeholder="Sua nova senha"
            label="Nova senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChangeInput<IFormData>(setFormData, e)}
            error={formErrors?.password}
          />
          <Input
            placeholder="Confirme a senha"
            label="Confirme sua senha"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChangeInput<IFormData>(setFormData, e)}
            error={formErrors?.confirmPassword}
          />
          <Button
            type="submit"
            className="mt-5"
            loading={isLoading}
            disabled={isLoading}
          >
            Criar senha
            <IconPasswordUser size={24} stroke={1.5} />
          </Button>
        </form>
      </div>
    </section>
  );
}
