import { IconMail } from '@tabler/icons-react';
import sojaImg from '../../assets/images/soja2.png';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Logo } from '../components/Logos/Logo';

export function ForgotPassword() {
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
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            placeholder="Seu email"
            label="E-mail"
            name="email"
            type="email"
          />
          <Button type="submit" className="mt-8">
            Enviar e-mail
            <IconMail size={24} stroke={1.5} />
          </Button>
        </form>
      </div>
    </section>
  );
}
