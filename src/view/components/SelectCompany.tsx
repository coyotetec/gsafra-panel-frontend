import { Listbox, Transition } from '@headlessui/react';
import { usePanelContext } from '../../app/hooks/usePanelContext';
import { IconChevronDown } from '@tabler/icons-react';
import { Fragment } from 'react/jsx-runtime';
import { cn } from '../../app/utils/cn';

export function SelectCompany() {
  const { selectedCompany, setSelectedCompany, userCompanies } =
    usePanelContext();
  const companies = userCompanies!.companies;

  return (
    <Listbox value={selectedCompany} onChange={setSelectedCompany}>
      <Listbox.Button className="flex gap-2 text-sm text-white">
        <span>{companies.find(({ id }) => id === selectedCompany)?.name}</span>
        <IconChevronDown size={20} />
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
        <Listbox.Options className="relative overflow-hidden rounded-b-md bg-white shadow-sm">
          {companies.map(({ id, name }) => (
            <Listbox.Option
              className={({ active, selected }) =>
                cn(
                  'cursor-pointer p-1.5 text-sm',
                  selected && 'bg-primary-100 font-medium text-primary-800',
                  active && 'bg-primary-50/60',
                )
              }
              key={id}
              value={id}
            >
              {name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
