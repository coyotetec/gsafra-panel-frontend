interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

export function Switch({ checked, onChange }: SwitchProps) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-500 after:absolute after:start-[4px] after:top-[4px] after:h-4 after:w-4 after:rounded-full after:bg-gray-600 after:transition-all after:duration-300 after:content-[''] peer-checked:bg-secondary-500 peer-checked:after:translate-x-5 peer-checked:after:bg-secondary-40"></div>
    </label>
  );
}
