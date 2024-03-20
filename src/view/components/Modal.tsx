import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { cn } from '../../app/utils/cn';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  danger?: boolean;
}

export function Modal({
  visible,
  onClose,
  title,
  description,
  children,
  danger = false,
}: ModalProps) {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black-70"></div>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-10"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-10"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-xl bg-white px-5 py-6">
                {title && (
                  <Dialog.Title
                    as="h3"
                    className={cn(
                      'text-center text-2xl font-bold',
                      danger && 'text-red-500',
                    )}
                  >
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="mt-1 text-center text-sm text-black-80">
                    {description}
                  </Dialog.Description>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
