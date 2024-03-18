import { IconLogout2 } from '@tabler/icons-react';
import { Button } from './Button';
import { LogoHorizontal } from './Logos/LogoHorizontal';
import { useAuth } from '../../app/hooks/useAuth';

interface HeaderProps {
  isManager?: boolean;
}

export function Header({ isManager }: HeaderProps) {
  const { signOut, user } = useAuth();
  return (
    <header className="fixed left-0 top-0 z-40 flex h-28 w-full items-center justify-between bg-white px-18 shadow-sm">
      <div className="flex items-center gap-2">
        <LogoHorizontal />
        {isManager && (
          <span className="rounded-full bg-primary-300 px-3 py-2 text-sm font-bold leading-none text-primary-50">
            MANAGER
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <strong className="font-semibold text-black-80">{user?.name}</strong>
        <Button variant="outline" className="w-28" onClick={signOut}>
          <IconLogout2 />
          Sair
        </Button>
      </div>
    </header>
  );
}
