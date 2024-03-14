import { ChangeEvent, FormEvent, useState } from 'react';
import { IconLogin } from '@tabler/icons-react';
import campImg from '../../../assets/images/camp.png';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logos/Logo';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { loginSchema } from './loginShemas';
import { formErrorType } from '../../../types/global';
import { formatZodError } from '../../../app/utils/formatZodError';
import { useAuth } from '../../../app/hooks/useAuth';
import toast from 'react-hot-toast';
import { APIError } from '../../../app/errors/APIError';

export function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<formErrorType | null>(null);
  const { signIn } = useAuth();

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  }

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
        <form className="mt-6 w-full max-w-104 " onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-3">
            <Input
              placeholder="Seu Email"
              label="E-mail"
              name="email"
              type="email"
              onChange={handleChange}
              value={userData.email}
              error={formErrors?.email}
            />
            <Input
              placeholder="Sua Senha"
              label="Senha"
              name="password"
              type="password"
              onChange={handleChange}
              value={userData.password}
              error={formErrors?.password}
            />
          </div>
          <Link to="/recuperar-senha">
            <span className="mt-2 inline-block w-full text-right text-xs font-medium text-primary-950">
              Esqueceu a senha?
            </span>
          </Link>
          <Button type="submit" className="mt-8">
            Entrar
            <IconLogin size={24} stroke={2} />
          </Button>
        </form>
      </div>
    </section>
  );
}
