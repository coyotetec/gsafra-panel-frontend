import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../../components/Button';
import { IconX } from '@tabler/icons-react';
import { Fragment, useState } from 'react';
import whatsappIcon from '../../../assets/icon/whatsapp.svg';

export function ContactWidget() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        type="button"
        className="absolute bottom-9 right-9 rounded-full bg-primary-400 p-3 transition-all duration-200 hover:bg-primary-500"
        onClick={() => setVisible(true)}
      >
        <img src={whatsappIcon} alt="Ícone do Whatsapp" className="w-8" />
      </button>
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
          onClose={() => setVisible(false)}
          className="fixed bottom-9 right-9 h-56 w-60 overflow-hidden rounded-xl bg-white"
        >
          <Dialog.Panel className="relative flex flex-col gap-3 px-3 pt-9">
            <div className="absolute left-0 right-0 top-0 flex h-9 justify-end bg-primary-900">
              <button className="mr-2" onClick={() => setVisible(false)}>
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
    </>
  );
}
