import campImg from '../../assets/camp.png';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';

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
          <span className="text-primary-950 text-xs font-medium">
            Esqueceu a senha?
          </span>
          <button
            type="submit"
            className="bg-primary-950 mt-6 w-full rounded-full p-4 text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
