import { IconCheck } from '@tabler/icons-react';
import { HTMLAttributes } from 'react';
import { cn } from '../../app/utils/cn';

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  name?: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export function Checkbox({
  checked,
  onChange,
  label,
  name,
  className,
}: CheckboxProps) {
  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      <input
        type="checkbox"
        id={name}
        name={name}
        className="peer relative h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-md bg-gray-400 outline-offset-0 outline-primary-500 checked:bg-secondary-500"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <IconCheck
        size={20}
        strokeWidth={3}
        className="pointer-events-none absolute left-0.5 top-0.5 hidden text-secondary-900 peer-checked:block"
      />
      {label && (
        <label htmlFor={name} className="cursor-pointer text-black/80">
          {label}
        </label>
      )}
    </div>
  );
}
