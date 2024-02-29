import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export function UserLayout() {
  return (
    <div className="bg-gray-400">
      <Header />
      <aside className="fixed left-0 top-28 z-40 flex h-calc-sidebar w-96">
        <nav className="h-full w-24 bg-primary-900"></nav>
        <div className="h-full w-full bg-primary-500"></div>
      </aside>
      <main className="ml-96 mt-28 min-h-calc-main px-9 py-10">
        <div className="mx-auto w-full max-w-8xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
