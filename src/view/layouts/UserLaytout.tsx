import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useState } from 'react';
import { Sidebar } from '../pages/User/Sidebar';
import { ContactWidget } from '../pages/User/ContactWidget';
import { SidebarProvider } from '../../app/contexts/SidebarContext';

export type CurrentContentType = 'users' | 'notifications';

export function UserLayout() {
  const [currentContent, setCurrentContent] =
    useState<CurrentContentType>('users');

  return (
    <div className="bg-gray-400">
      <Header />
      <SidebarProvider>
        <Sidebar
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
      </SidebarProvider>
      <main className="relative ml-96 mt-28 min-h-calc-main px-9 py-10">
        <section className="mx-auto w-full max-w-8xl">
          <Outlet />
        </section>

        <ContactWidget />
      </main>
    </div>
  );
}
