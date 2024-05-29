import { Icon } from '@tabler/icons-react';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../../../../app/utils/cn';
import { motion } from 'framer-motion';

interface ButtonSidebarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: Icon;
  className?: string;
  isSelected: boolean;
}

export function ButtonSidebar({
  Icon,
  className,
  isSelected,
  ...rest
}: ButtonSidebarProps) {
  return (
    <button
      {...rest}
      className={cn(
        'relative flex h-16 w-16 items-center justify-center rounded-xl border-2 border-transparent text-primary-300 transition-all duration-200',
        className,
        !isSelected && 'hover:bg-primary-700',
      )}
    >
      <Icon size={28} className={cn('z-10', isSelected && 'text-white')} />
      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 top-0 rounded-xl bg-primary-500"
        />
      )}
    </button>
  );
}
