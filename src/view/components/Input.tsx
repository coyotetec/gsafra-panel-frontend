import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { InputHTMLAttributes, LegacyRef, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  wrapperStyle?: string;
  error?: string;
  refInput?: LegacyRef<HTMLInputElement>;
}

export function Input({
  name,
  label,
  wrapperStyle,
  error,
  refInput,
  type,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={wrapperStyle || 'mt-3 flex flex-col'}>
      {label && (
        <label className="text-primary-950 text-xs font-medium" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className=" outline-primary-950 max-w-104 mt-2 w-full rounded-xl bg-gray-400 p-4 outline-1"
          type={type === 'password' && showPassword ? 'text' : type}
          ref={refInput}
          id={name}
          {...rest}
        />

        {type === 'password' && !showPassword ? (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <IconEye
              size={24}
              stroke={1.5}
              className="text-primary-700 absolute right-3 top-6"
            />
          </button>
        ) : type === 'password' && showPassword ? (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <IconEyeOff
              size={24}
              stroke={1.5}
              className="text-primary-700 absolute right-3 top-6"
            />
          </button>
        ) : null}
      </div>
      {error && <span>{error}</span>}
    </div>
  );
}
