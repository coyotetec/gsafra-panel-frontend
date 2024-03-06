import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../../components/Button';
import { IconX } from '@tabler/icons-react';
import { Fragment } from 'react';

interface ContactWidgetProps {
  visible: boolean;
  onClose: () => void;
}

export function ContactWidget({ onClose, visible }: ContactWidgetProps) {
  return (
    <Transition
      appear
      show={visible}
      enter="ease-out duration-500"
      enterFrom="opacity-0 translate-y-10"
      enterTo="opacity-100  translate-y-0"
      leave="ease-in duration-300"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-10"
      as={Fragment}
    >
      <Dialog
        onClose={onClose}
        className="fixed bottom-9 right-9 h-56 w-60 overflow-hidden rounded-xl bg-white"
      >
        <Dialog.Panel className="relative flex flex-col gap-3 px-3 pt-9">
          <div className="absolute left-0 right-0 top-0 flex h-9 justify-end bg-primary-900">
            <button className="mr-2" onClick={onClose}>
              <IconX size={24} stroke={2} className="text-white" />
            </button>
          </div>
          <Dialog.Title className="mt-3 text-center font-semibold">
            Que tipo de contato você necessita?
          </Dialog.Title>
          <div className="flex flex-col gap-2">
            <Button className="h-12">Comercial</Button>
            <Button className="h-12">Suporte</Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
