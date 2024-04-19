import { Icon } from '@tabler/icons-react';
import { IUserDataAuthenticated } from '../../../../../types/users';
import { CurrentContentType } from '../../../../layouts/UserLayout';

interface IContent {
  current: CurrentContentType;
  icon: Icon;
  component: JSX.Element;
}

interface ContentProps {
  user: IUserDataAuthenticated | null;
  contents: IContent[];
  currentContent: CurrentContentType;
}

export function Content({ user, contents, currentContent }: ContentProps) {
  if (user?.role === 'USER') {
    const content = contents
      .filter(({ current }) => current !== 'users')
      .find(({ current }) => current === currentContent);

    return content?.component || null;
  }

  const content = contents.find(({ current }) => current === currentContent);

  return content?.component || null;
}
