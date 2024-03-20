import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';
import { UserRoleType } from '../types/users';

interface AuthGuardProps {
  accessRoles: UserRoleType[];
}

export default function AuthGuard({ accessRoles }: AuthGuardProps) {
  const { signedIn, user } = useAuth();

  if (!signedIn && accessRoles.length !== 0) {
    return <Navigate to="/login" replace />;
  }

  if (user) {
    if (signedIn && user.role === 'MANAGER' && accessRoles.length === 0) {
      return <Navigate to="/manager" replace />;
    }

    if (
      signedIn &&
      ['ADMIN', 'USER'].includes(user.role) &&
      accessRoles.length === 0
    ) {
      return <Navigate to="/" replace />;
    }

    if (user.role === 'MANAGER' && !accessRoles.includes(user.role)) {
      return <Navigate to="/manager" replace />;
    }

    if (
      ['ADMIN', 'USER'].includes(user.role) &&
      !accessRoles.includes(user.role)
    ) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
