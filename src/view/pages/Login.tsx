import { IconLogin } from '@tabler/icons-react';
import campImg from '../../assets/images/camp.png';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function Login() {
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
          className="mt-6 w-full max-w-104"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            placeholder="Seu Email"
            label="E-mail"
            name="email"
            type="email"
          />
          <Input
            placeholder="Sua Senha"
            label="Senha"
            name="password"
            type="password"
          />
          <Link to="/recuperar-senha">
            <span className="text-primary-950 text-xs font-medium">
              Esqueceu a senha?
            </span>
          </Link>
          <Button type="submit">
            Entrar
            <IconLogin size={24} stroke={2} />
          </Button>
        </form>
      </div>
    </section>
  );
}
