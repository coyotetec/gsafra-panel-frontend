import { IconPasswordUser } from '@tabler/icons-react';
import sojaImg from '../../assets/images/soja.png';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Logo } from '../components/Logos/Logo';

export function CreatePassword() {
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
          className="mt-6 w-full max-w-104"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            placeholder="Sua nova senha"
            label="Nova senha"
            name="password"
            type="password"
          />
          <Input
            placeholder="Confirme a senha"
            label="Confirme sua senha"
            name="password"
            type="password"
          />
          <Button type="submit">
            Criar senha
            <IconPasswordUser size={24} stroke={1.5} />
          </Button>
        </form>
      </div>
    </section>
  );
}
