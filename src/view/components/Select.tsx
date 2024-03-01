import { Fragment, HTMLAttributes, useMemo, useState } from 'react';
import { cn } from '../../app/utils/cn';
import { Listbox, Transition } from '@headlessui/react';
import { IconChevronDown } from '@tabler/icons-react';

interface SelectProps {
  wrapperClass?: HTMLAttributes<HTMLDivElement>['className'];
  label?: string;
  placeholder?: string;
  options: Array<any>;
  valueKey: string;
  labelKey: string;
}

export function Select({
  label,
  placeholder = 'Selecione...',
  wrapperClass,
  options,
  valueKey,
  labelKey,
}: SelectProps) {
  const [selected, setSelected] = useState<string | undefined>();
  const selectedOption = useMemo(
    () => options.find((option) => selected === option[valueKey]),
    [options, selected, valueKey],
  );

  return (
    <div className={cn('flex w-full flex-col', wrapperClass)}>
      {label && (
        <label className="text-xs font-medium text-primary-950">{label}</label>
      )}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-0.5">
          <Listbox.Button
            className="relative flex h-13 w-full items-center justify-between
          rounded-xl bg-gray-400 px-4 outline-primary-500"
          >
            <span className={cn('text-black/80', !selected && 'text-black/50')}>
              {selectedOption ? selectedOption[labelKey] : placeholder}
            </span>
            <IconChevronDown className="text-black-80" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition transform ease-in-out duration-300 origin-top"
            enterFrom="opacity-50 scale-y-0"
            enterTo="opacity-100 scale-y-100"
            leave="transition transform ease-in duration-150 origin-top"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-gray-400 p-2 text-sm shadow-md shadow-black/35 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option[valueKey]}
                  value={option[valueKey]}
                  className={({ active, selected }) =>
                    cn(
                      'cursor-pointer select-none rounded-lg px-4 py-3 text-black-80',
                      active &&
                        'bg-primary-500/20 font-medium text-primary-800',
                      selected &&
                        'bg-primary-500/40 font-semibold text-primary-600',
                    )
                  }
                >
                  <span className="block truncate">{option[labelKey]}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
