import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../app/utils/cn';
import { Spinner } from './Loaders/Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'outline' | 'light' | 'secondary' | 'danger';
  loading?: boolean;
}

export function Button({
  children,
  className,
  variant,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex h-13 w-full items-center justify-center gap-1 rounded-full bg-primary-500 font-medium leading-none text-white outline-none transition-colors hover:bg-primary-400',
        'flex h-13 w-full items-center justify-center gap-1 rounded-full bg-primary-500 font-medium leading-none text-white outline-none transition-colors hover:bg-primary-400',
        variant === 'outline' &&
          'border-2 border-primary-500 bg-primary-500/10 text-primary-500 hover:bg-primary-500/20',
        variant === 'light' && 'bg-white text-primary-960 hover:bg-gray-400',
        variant === 'secondary' &&
          'bg-gray-400 text-black-70 hover:bg-gray-500',
        variant === 'danger' && 'bg-red-500 hover:bg-red-600',
        className,
      )}
      {...rest}
    >
      {loading ? <Spinner className="h-7 w-7" /> : children}
    </button>
  );
}
