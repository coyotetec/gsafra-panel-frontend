import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';

interface AuthGuardProps {
  isPrivate: boolean;
}

export default function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn, user } = useAuth();

  if (
    signedIn &&
    !isPrivate &&
    (user?.role === 'USER' || user?.role === 'ADMIN')
  ) {
    return <Navigate to="/" replace />;
  }

  if (signedIn && !isPrivate && user?.role === 'MANAGER') {
    return <Navigate to="/manager/companies" replace />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
