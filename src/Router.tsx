import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './view/pages/Login';
import { CreatePassword } from './view/pages/CreatePassword';
import { ForgotPassword } from './view/pages/ForgotPassword';
import { Companies } from './view/pages/Manager/Companies';
import { Users } from './view/pages/Manager/Users';
import { Notifications } from './view/pages/Manager/Notifications';
import { ManagerLayout } from './view/layouts/ManagerLayout';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/criar-senha" element={<CreatePassword />} />
        <Route path="recuperar-senha" element={<ForgotPassword />} />

        <Route element={<ManagerLayout />}>
          <Route path="/manager/companies" element={<Companies />} />
          <Route path="/manager/users" element={<Users />} />
          <Route path="/manager/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
