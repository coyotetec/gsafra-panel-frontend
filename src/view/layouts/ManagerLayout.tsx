import {
  IconBell,
  IconBuildingCommunity,
  IconLogout2,
  IconUser,
  Icon,
} from '@tabler/icons-react';
import logoHorizontal from '../../assets/images/logo-horizontal.svg';
import { NavLink, Outlet } from 'react-router-dom';

interface NavItem {
  Icon: Icon;
  label: string;
  path: string;
}

export function ManagerLayout() {
  const navItems: NavItem[] = [
    {
      Icon: IconBuildingCommunity,
      label: 'Empresas',
      path: '/manager/companies',
    },
    {
      Icon: IconUser,
      label: 'Usuários',
      path: '/manager/users',
    },
    {
      Icon: IconBell,
      label: 'Notificações',
      path: '/manager/notifications',
    },
  ];

  return (
    <div className="bg-gray-400">
      <header className="fixed left-0 top-0 z-40 flex h-28 w-full items-center justify-center bg-white">
        <div className="flex w-full max-w-8xl items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoHorizontal} alt="logo" />
            <span className="bg-primary-300 text-primary-50 rounded-full px-3 py-2 text-sm font-bold leading-none">
              MANAGER
            </span>
          </div>
          <div className="flex items-center gap-4">
            <strong className="text-black-80 font-semibold">Iran Adryan</strong>
            <button className="border-primary-950 text-primary-950 flex h-13 items-center justify-center gap-2 rounded-full border-2 bg-[rgba(3,78,44,0.1)] px-6 font-semibold leading-none transition-colors hover:bg-[rgba(3,78,44,0.25)]">
              <IconLogout2 />
              Sair
            </button>
          </div>
        </div>
      </header>
      <aside className="h-calc-sidebar fixed left-0 top-28 z-40 w-80">
        <div className="bg-primary-500 h-full overflow-y-auto px-3 py-4">
          <ul className="space-y-2 font-semibold">
            {navItems.map(({ Icon, label, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `text-primary-50 hover:bg-primary-400 flex items-center gap-2 rounded-xl p-4 leading-none transition-colors ${isActive ? '!bg-primary-300 text-white' : ''}`
                  }
                >
                  <Icon />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="min-h-calc-main ml-80 mt-28 px-9 py-10">
        <div className="mx-auto w-full max-w-8xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
