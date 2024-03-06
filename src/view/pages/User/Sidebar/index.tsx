import { Icon, IconBellFilled, IconUserFilled } from '@tabler/icons-react';
import { Users } from './content/Users';
import { Notifications } from './content/Notifications';
import { ButtonSidebar } from './components/ButtonSidebar';
import { CurrentContentType } from '../../../layouts/UserLaytout';
import { cn } from '../../../../app/utils/cn';

interface IContent {
  current: CurrentContentType;
  icon: Icon;
  component: JSX.Element;
}

interface SidebarProps {
  currentContent: CurrentContentType;
  setCurrentContent: (content: CurrentContentType) => void;
}

export function Sidebar({ currentContent, setCurrentContent }: SidebarProps) {
  const contents: IContent[] = [
    {
      current: 'users',
      icon: IconUserFilled,
      component: <Users />,
    },
    {
      current: 'notifications',
      icon: IconBellFilled,
      component: <Notifications />,
    },
  ];

  function Content() {
    const content = contents.find(({ current }) => current === currentContent);

    return content?.component || null;
  }

  return (
    <aside className="fixed left-0 top-28 z-40 flex h-calc-sidebar w-96">
      <nav className="flex h-full w-24 flex-col items-center gap-2 bg-primary-900 px-4 py-5">
        {contents.map(({ current, icon }) => (
          <ButtonSidebar
            className={cn(
              current === currentContent && 'bg-primary-500 text-white',
            )}
            key={current}
            Icon={icon}
            onClick={() => setCurrentContent(current)}
          />
        ))}
      </nav>
      <div className="flex h-full w-full flex-col bg-primary-500 px-5 py-8">
        <Content />
      </div>
    </aside>
  );
}
