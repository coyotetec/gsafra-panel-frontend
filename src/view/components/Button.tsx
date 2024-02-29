import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../app/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'outline' | 'light';
}

export function Button({ children, className, variant, ...rest }: ButtonProps) {
  return (
    <button
      className={cn(
        'flex h-13 w-full items-center justify-center gap-1 rounded-full bg-primary-500 font-medium leading-none text-white outline-none transition-colors hover:bg-primary-400',
        variant === 'outline' &&
          'border-2 border-primary-950 bg-[rgba(3,78,44,0.1)] text-primary-950 hover:bg-[rgba(3,78,44,0.25)]',
        variant === 'light' && 'bg-white text-primary-960 hover:bg-gray-400',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
