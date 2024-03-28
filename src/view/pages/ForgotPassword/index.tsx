import { IconMail } from '@tabler/icons-react';
import sojaImg from '../../../assets/images/soja2.webp';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Logo } from '../../components/Logos/Logo';
import { FormEvent, useState } from 'react';
import { emailSchema } from './schemas';
import { formatZodError } from '../../../app/utils/formatZodError';
import { AuthService } from '../../../app/services/AuthService';
import toast from 'react-hot-toast';
import { APIError } from '../../../app/errors/APIError';

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);

      const emailValidation = emailSchema.safeParse(email);

      if (!emailValidation.success) {
        setIsLoading(false);
        return setEmailError(formatZodError(emailValidation.error)['']);
      }

      setEmailError(undefined);

      const { message } = await AuthService.requestReset(emailValidation.data);

      toast.success(message);
    } catch (err) {
      if (err instanceof APIError) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid max-h-screen grid-cols-init justify-center gap-4 bg-white p-4">
      <img
        src={sojaImg}
        alt="plantação"
        className="h-calc-img w-full rounded-3xl object-cover"
      />
      <div className="flex flex-col items-center justify-center">
        <Logo />
        <h2 className="text-2xl font-bold">Esqueceu a Senha?</h2>
        <span className="mt-2 text-sm text-black-80">
          Digite seu e-mail de cadastro para redefinir sua senha
        </span>
        <form
          className="mt-6 w-full max-w-104"
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            placeholder="Seu email"
            label="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <Button
            type="submit"
            className="mt-8"
            loading={isLoading}
            disabled={isLoading}
          >
            Enviar e-mail
            <IconMail size={24} stroke={1.5} />
          </Button>
        </form>
      </div>
    </section>
  );
}
