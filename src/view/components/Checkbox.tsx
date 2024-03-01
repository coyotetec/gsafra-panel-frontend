import { IconCheck } from '@tabler/icons-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <div className="relative flex items-center gap-2">
      <input
        type="checkbox"
        id="all-companies"
        className="peer relative h-6 w-6 shrink-0 cursor-pointer appearance-none rounded-md bg-gray-400 outline-offset-0 outline-primary-500 checked:bg-secondary-500"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <IconCheck
        size={20}
        strokeWidth={3}
        className="pointer-events-none absolute left-0.5 top-0.5 hidden text-secondary-900 peer-checked:block"
      />
      <label htmlFor="all-companies" className="cursor-pointer text-black/80">
        Todas as empresas
      </label>
    </div>
  );
}
