import { Icon } from '@tabler/icons-react';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../../../app/utils/cn';

interface ButtonSidebarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: Icon;
  className?: string;
}

export function ButtonSidebar({
  Icon,
  className,
  ...rest
}: ButtonSidebarProps) {
  return (
    <button
      {...rest}
      className={cn(
        'flex h-16 w-16 items-center justify-center rounded-xl text-primary-300',
        className,
      )}
    >
      <Icon size={28} />
    </button>
  );
}
