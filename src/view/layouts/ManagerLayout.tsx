import {
  IconBell,
  IconBuildingCommunity,
  IconUser,
  Icon,
  IconPlus,
} from '@tabler/icons-react';
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '../../app/utils/cn';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

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
      <Header isManager={true} />
      <aside className="fixed left-0 top-28 z-40 h-calc-sidebar w-80">
        <nav className="h-full overflow-y-auto bg-primary-500 px-3 py-4">
          <ul className="space-y-2 font-semibold">
            {navItems.map(({ Icon, label, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-xl p-4 leading-none text-primary-50 transition-colors hover:bg-primary-400',
                      isActive && '!bg-primary-300 text-white',
                    )
                  }
                >
                  <Icon />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button variant="light">
            <IconPlus />
            Nova Empresa
          </Button>
        </nav>
      </aside>
      <main className="ml-80 mt-28 min-h-calc-main px-9 py-10">
        <div className="mx-auto w-full max-w-8xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
