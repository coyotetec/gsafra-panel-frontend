import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useState } from 'react';
import { Sidebar } from '../pages/User/Sidebar';
import { ContactWidget } from '../pages/User/ContactWidget';
import { PanelProvider } from '../../app/contexts/PanelContext';

export type CurrentContentType = 'users' | 'notifications' | 'mobileAccess';

export function UserLayout() {
  const [currentContent, setCurrentContent] =
    useState<CurrentContentType>('users');

  return (
    <div className="bg-gray-400">
      <Header />

      <PanelProvider>
        <Sidebar
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
        <main className="relative ml-96 mt-28 min-h-calc-main px-9 py-10">
          <section className="mx-auto w-full max-w-8xl">
            <Outlet />
          </section>

          <ContactWidget />
        </main>
      </PanelProvider>
    </div>
  );
}
