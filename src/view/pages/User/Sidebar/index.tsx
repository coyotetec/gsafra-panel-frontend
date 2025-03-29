import { Icon, IconBellFilled, IconPasswordMobilePhone, IconUserFilled } from '@tabler/icons-react';
import { Users } from './content/Users/';
import { Notifications } from './content/Notifications';
import { ButtonSidebar } from './components/ButtonSidebar';
import { CurrentContentType } from '../../../layouts/UserLayout';
import { useAuth } from '../../../../app/hooks/useAuth';
import { useEffect } from 'react';
import { Content } from './components/Content';
import { MobileAccess } from './content/MobileAccess';
import { usePanelContext } from '../../../../app/hooks/usePanelContext';

interface IContent {
  current: CurrentContentType;
  icon: Icon;
  component: JSX.Element;
  adminOnly: boolean;
}

interface SidebarProps {
  currentContent: CurrentContentType;
  setCurrentContent: (content: CurrentContentType) => void;
}

const contents: IContent[] = [
  {
    current: 'users',
    icon: IconUserFilled,
    component: <Users />,
    adminOnly: true,
  },
  {
    current: 'notifications',
    icon: IconBellFilled,
    component: <Notifications />,
    adminOnly: false,
  },
  {
    current: 'mobileAccess',
    icon: IconPasswordMobilePhone,
    component: <MobileAccess />,
    adminOnly: true,
  },
];

export function Sidebar({ currentContent, setCurrentContent }: SidebarProps) {
  const { user } = useAuth();
  const {hiddenPanel} = usePanelContext()
  useEffect(() => {
    if (user?.role === 'USER') {
      setCurrentContent('notifications');
    }
  }, [user?.role, setCurrentContent]);
  if(hiddenPanel) return null
  return (
    <aside className="fixed left-0 top-28 z-40 flex h-calc-sidebar w-96">
      <nav className="flex h-full w-24 flex-col items-center gap-2 bg-primary-900 px-4 py-5">
        {contents.map(({ current, icon, adminOnly }) => {
          if (user?.role === 'USER' && adminOnly) {
            return null;
          }

          return (
            <ButtonSidebar
              key={current}
              Icon={icon}
              onClick={() => setCurrentContent(current)}
              isSelected={current === currentContent}
            />
          );
        })}
      </nav>
      <div className="flex h-full w-full flex-col bg-primary-500 px-5 py-8">
        <Content
          contents={contents}
          user={user}
          currentContent={currentContent}
        />
      </div>
    </aside>
  );
}
