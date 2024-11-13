/* eslint-disable @typescript-eslint/no-explicit-any */
import { Listbox, Transition } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { Fragment, HTMLAttributes } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Loaders/Spinner";

interface SelectProps {
  wrapperClass?: HTMLAttributes<HTMLDivElement>["className"];
  label?: string;
  error?: string;
  placeholder?: string;
  options: Array<any>;
  valueKey: string;
  labelKey: string;
  selected: any;
  setSelected: (value: any) => void;
  loading?: boolean;
  isSecondary?: boolean;
  prefix?: string;
}

export function Select({
  label,
  placeholder = "Selecione...",
  wrapperClass,
  options,
  valueKey,
  labelKey,
  selected,
  setSelected,
  error,
  loading = false,
  isSecondary = false,
  prefix,
}: SelectProps) {
  return (
    <div className={cn("flex w-full flex-col", wrapperClass)}>
      {label && (
        <label className="text-xs font-medium text-primary-950">{label}</label>
      )}
      <Listbox
        value={selected ? selected[valueKey] : ""}
        onChange={(value) =>
          setSelected(options.find((option) => value === option[valueKey]))
        }
      >
        <div className="relative mt-0.5">
          <Listbox.Button
            className={`relative flex h-13 w-full items-center justify-between
          rounded-xl bg-gray-400 px-4 outline-primary-500
          ${isSecondary && "!h-11 !rounded-lg bg-white !px-2 !text-white ring-primary-500 hover:ring-2"}
          `}
          >
            <span
              className={cn(
                "text-black/80",
                isSecondary && "text-xs text-gray-700",
                !selected && "text-black/50",
              )}
            >
              {prefix ? (
                <strong className="mr-2 text-sm text-primary-500">
                  {prefix}
                </strong>
              ) : null}
              {selected ? selected[labelKey] : placeholder}
            </span>
            {loading ? (
              <Spinner className="text-black-80" />
            ) : (
              <IconChevronDown
                className={cn("text-black-80", isSecondary && "!text-black")}
              />
            )}
          </Listbox.Button>
          {error && (
            <span className="ml-2 mt-1 text-xs text-red-500">{error}</span>
          )}
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
                      "cursor-pointer select-none rounded-lg px-4 py-3 text-black-80",
                      active &&
                        "bg-primary-500/20 font-medium text-primary-800",
                      selected &&
                        "bg-primary-500/40 font-semibold text-primary-600",
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
      {error && <span className="ml-2 mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
}
