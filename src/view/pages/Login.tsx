import campImg from '../../assets/camp.png';
import { Input } from '../components/Input';
import { Logo } from '../components/Logo';

export function Login() {
  return (
    <section className="grid max-h-screen grid-cols-init justify-center gap-4 bg-white p-4">
      <img
        src={campImg}
        alt="plantação"
        className="h-calcImg w-full rounded-3xl object-cover"
      />
      <div className="flex flex-col items-center justify-center">
        <Logo />
        <h2 className="text-2xl font-bold">Acesse sua conta</h2>
        <form
          className="mt-6 w-full max-w-104"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input placeholder="Seu Email" label="E-mail" name="email" />
          <Input
            placeholder="Sua Senha"
            label="Senha"
            name="password"
            type="password"
          />
          <span className="text-xs font-medium text-primary950">
            Esqueceu a senha?
          </span>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-primary950 p-4 text-white"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
