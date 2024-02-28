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
        'bg-primary-500 hover:bg-primary-400 flex h-13 w-full items-center justify-center gap-1 rounded-full font-medium leading-none text-white outline-none transition-colors',
        variant === 'outline' &&
          'border-primary-950 text-primary-950 border-2 bg-[rgba(3,78,44,0.1)] hover:bg-[rgba(3,78,44,0.25)]',
        variant === 'light' && 'text-primary-960 bg-white hover:bg-gray-400',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
