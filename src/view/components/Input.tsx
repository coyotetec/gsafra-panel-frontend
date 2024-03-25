import { IconEye, IconEyeOff } from '@tabler/icons-react';
import {
  HTMLAttributes,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import { cn } from '../../app/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  wrapperClass?: HTMLAttributes<HTMLDivElement>['className'];
  className?: HTMLAttributes<HTMLInputElement>['className'];
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      wrapperClass,
      className,
      error,
      type,
      prefix,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn('flex flex-col', wrapperClass)}>
        {label && (
          <label
            className="text-xs font-medium text-primary-950"
            htmlFor={name}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'mt-0.5 flex h-13 w-full overflow-hidden rounded-xl bg-gray-400 focus-within:outline focus-within:outline-2 focus-within:outline-primary-500',
            disabled && 'opacity-70',
            className,
          )}
        >
          {prefix && (
            <label
              className="flex h-full items-center bg-gray-500/70 px-4 font-semibold text-black/40"
              htmlFor={name}
            >
              {prefix}
            </label>
          )}
          <input
            className="h-full flex-1 bg-transparent px-4 text-black/80 outline-none placeholder:text-black/50"
            type={type === 'password' && showPassword ? 'text' : type}
            ref={ref}
            id={name}
            name={name}
            disabled={disabled}
            {...rest}
          />
          {type === 'password' && (
            <button
              type="button"
              className="group px-2 text-primary-700 outline-none focus:text-primary-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IconEyeOff strokeWidth={1.5} />
              ) : (
                <IconEye strokeWidth={1.5} />
              )}
            </button>
          )}
        </div>
        {error && (
          <span className="ml-2 mt-1 text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
