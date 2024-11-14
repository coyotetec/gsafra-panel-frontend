import { IconLogin2 } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { APIError } from "../../../app/errors/APIError";
import { useAuth } from "../../../app/hooks/useAuth";
import { formatZodError } from "../../../app/utils/formatZodError";
import { handleChangeInput } from "../../../app/utils/handleChangeInput";
import campImg from "../../../assets/images/camp.webp";
import { ILoginData } from "../../../types/authentication";
import { FormErrorType } from "../../../types/global";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logos/Logo";
import { loginSchema } from "./loginShemas";

export function Login() {
  const [userData, setUserData] = useState<ILoginData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrorType | null>(null);
  const { signIn } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const loginValidation = loginSchema.safeParse(userData);

      if (!loginValidation.success) {
        return setFormErrors(formatZodError(loginValidation.error));
      }

      setFormErrors(null);

      await signIn(userData);
    } catch (err) {
      if (err instanceof APIError) toast.error(err.message);
    }
  }

  return (
    <section className="grid max-h-screen grid-cols-init justify-center gap-4 bg-white p-4">
      <img
        src={campImg}
        alt="plantação"
        className="h-calc-img w-full rounded-3xl object-cover"
      />
      <div className="flex flex-col items-center justify-center">
        <Logo />
        <h2 className="text-2xl font-bold">Acesse sua conta</h2>
        <form
          className="mt-6 w-full max-w-104 "
          onSubmit={handleSubmit}
          noValidate
        >
          <div className=" flex flex-col gap-3">
            <Input
              placeholder="Seu Email"
              label="E-mail"
              name="email"
              type="email"
              onChange={(event) => handleChangeInput(setUserData, event)}
              value={userData.email}
              error={formErrors?.email}
            />
            <Input
              placeholder="Sua Senha"
              label="Senha"
              name="password"
              type="password"
              onChange={(event) => handleChangeInput(setUserData, event)}
              value={userData.password}
              error={formErrors?.password}
            />
          </div>
          <Link to="/forgot-password">
            <span className="mt-2 inline-block w-full text-right text-xs font-medium text-primary-950">
              Esqueceu a senha?
            </span>
          </Link>
          <Button type="submit" className="mt-8 gap-4">
            Entrar
            <IconLogin2 size={24} stroke={2} />
          </Button>
        </form>
      </div>
    </section>
  );
}
