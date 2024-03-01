import { HTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '../../app/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label?: string;
  wrapperClass?: HTMLAttributes<HTMLDivElement>['className'];
  error?: string;
}

export function TextArea({
  name,
  label,
  wrapperClass,
  error,
  ...rest
}: TextareaProps) {
  return (
    <div className={cn('flex flex-col', wrapperClass)}>
      {label && (
        <label className="text-xs font-medium text-primary-950" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="mt-0.5 flex h-28 w-full overflow-hidden rounded-xl bg-gray-400 focus-within:outline focus-within:outline-2 focus-within:outline-primary-500">
        <textarea
          className="h-full flex-1 resize-none bg-transparent p-4 text-black/80 outline-none placeholder:text-black/50"
          id={name}
          {...rest}
        />
      </div>
      {error && <span>{error}</span>}
    </div>
  );
}
