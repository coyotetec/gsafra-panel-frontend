import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../view/pages/Login';
import { CreatePassword } from '../view/pages/CreatePassword';
import { ForgotPassword } from '../view/pages/ForgotPassword';
import { Companies } from '../view/pages/Manager/Companies';
import { Users } from '../view/pages/Manager/Users';
import { Notifications } from '../view/pages/Manager/Notifications';
import { ManagerLayout } from '../view/layouts/ManagerLayout';
import { UserLayout } from '../view/layouts/UserLayout';
import { Panel } from '../view/pages/User/Panel';
import AuthGuard from './AuthGuard';
import { AppLinks } from '../view/pages/AppLinks';
import { CompanyDetail } from '../view/pages/Company';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard accessRoles={[]} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/app-links" element={<AppLinks />} />
        </Route>

        <Route element={<AuthGuard accessRoles={['ADMIN', 'USER']} />}>
          <Route element={<UserLayout />}>
            <Route path="/" element={<Navigate to="/panel" />} />
            <Route path="/panel" element={<Panel />} />
          </Route>
        </Route>

        <Route element={<AuthGuard accessRoles={['MANAGER']} />}>
          <Route element={<ManagerLayout />}>
            <Route
              path="/manager"
              element={<Navigate to="/manager/companies" />}
            />
            <Route path="/manager/companies" element={<Companies />} />
            <Route path="/manager/users" element={<Users />} />
            <Route path="/manager/notifications" element={<Notifications />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
