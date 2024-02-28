import { IconLogout2 } from '@tabler/icons-react';
import logoHorizontal from '../../assets/images/logo-horizontal.svg';
import { Button } from './Button';

interface HeaderProps {
  isManager?: boolean;
}

export function Header({ isManager }: HeaderProps) {
  return (
    <header className="px-18 fixed left-0 top-0 z-40 flex h-28 w-full items-center justify-center border-[1px] border-black bg-white">
      <div className="flex w-full max-w-8xl items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logoHorizontal} alt="logo" />
          {isManager && (
            <span className="rounded-full bg-primary-300 px-3 py-2 text-sm font-bold leading-none text-primary-50">
              MANAGER
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <strong className="font-semibold text-black-80">Iran Adryan</strong>
          <Button variant="outline" className="w-28">
            <IconLogout2 />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
