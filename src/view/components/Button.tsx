import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-primary-700 mt-6 flex w-full items-center justify-center gap-1 rounded-full p-4 font-semibold text-white transition-opacity hover:opacity-95"
      {...rest}
    >
      {children}
    </button>
  );
}
