import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../view/pages/Login';
import { CreatePassword } from '../view/pages/CreatePassword';
import { ForgotPassword } from '../view/pages/ForgotPassword';
import { Companies } from '../view/pages/Manager/Companies';
import { Users } from '../view/pages/Manager/Users';
import { Notifications } from '../view/pages/Manager/Notifications';
import { ManagerLayout } from '../view/layouts/ManagerLayout';
import { UserLayout } from '../view/layouts/UserLaytout';
import { Panel } from '../view/pages/User/Panel';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<UserLayout />}>
          <Route path="/panel" element={<Panel />} />
        </Route>

        <Route element={<ManagerLayout />}>
          <Route path="/manager/companies" element={<Companies />} />
          <Route path="/manager/users" element={<Users />} />
          <Route path="/manager/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
