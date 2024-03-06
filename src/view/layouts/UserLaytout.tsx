import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useState } from 'react';
import { Sidebar } from '../pages/User/Sidebar';
import whatsappIcon from '../../assets/icon/whatsapp.svg';
import { ContactWidget } from '../pages/User/ContactWidget';

export type CurrentContentType = 'users' | 'notifications';

export function UserLayout() {
  const [currentContent, setCurrentContent] =
    useState<CurrentContentType>('users');
  const [showContactWidget, setShowContactWidget] = useState(false);

  return (
    <div className="bg-gray-400">
      <Header />
      <Sidebar
        currentContent={currentContent}
        setCurrentContent={setCurrentContent}
      />
      <main className="relative ml-96 mt-28 min-h-calc-main px-9 py-10">
        <section className="mx-auto w-full max-w-8xl">
          <Outlet />
        </section>
        <button
          type="button"
          className="absolute bottom-9 right-9 rounded-full bg-primary-400 p-3 transition-all duration-200 hover:bg-primary-500"
          onClick={() => setShowContactWidget(true)}
        >
          <img src={whatsappIcon} alt="Ícone do Whatsapp" className="w-8" />
        </button>
        <ContactWidget
          onClose={() => setShowContactWidget(false)}
          visible={showContactWidget}
        />
      </main>
    </div>
  );
}
