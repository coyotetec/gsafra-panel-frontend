import { ChangeEvent } from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Switch({ checked, onChange }: SwitchProps) {
  return (
    <div className="inline-flex cursor-pointer items-center">
      <input
        id="customSwitch"
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onClick={(event) => event.stopPropagation()} // evita propagação no clique
        onChange={(event) => {
          event.stopPropagation(); // evita propagação no change
          onChange(event);
        }}
      />
      <label htmlFor="customSwitch" className="inline-flex items-center cursor-pointer">
        <div
          className={`
            relative h-6 w-11 rounded-full transition-all duration-300
            ${checked ? 'bg-secondary-500' : 'bg-gray-500'}
            after:absolute after:start-[4px] after:top-[4px] after:h-4 after:w-4 after:rounded-full
            ${checked ? 'after:translate-x-5 after:bg-secondary-40' : 'after:bg-gray-600'}
            after:transition-all after:duration-300 after:content-['']
          `}
        />
      </label>
    </div>
  );
}
