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
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className={wrapperStyle || 'mt-3 flex flex-col'}>
      {label && (
        <label className="text-xs font-medium text-primary950" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          className=" max-w-104  mt-2 w-full rounded-xl bg-GGray400 p-4 outline-1 outline-primary950"
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
              className="absolute right-3 top-6"
            />
          </button>
        ) : type === 'password' && showPassword ? (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <IconEyeOff
              size={24}
              stroke={1.5}
              className="absolute right-3 top-6"
            />
          </button>
        ) : null}
      </div>
      {error && <span>{error}</span>}
    </div>
  );
}
