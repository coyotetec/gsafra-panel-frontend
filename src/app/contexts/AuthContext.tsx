import { ReactNode, createContext, useCallback, useState } from 'react';
import { ILoginData } from '../../types/authentication';
import { AuthService } from '../services/AuthService';
import { localStorageKeys } from '../config/localStorageKeys';

interface AuthProviderProps {
  children: ReactNode;
}

interface IUserDataType {
  name: string;
  role: string;
  id: string;
}

interface IAuthContextValue {
  signedIn: boolean;
  signIn: (payload: ILoginData) => Promise<void>;
  user: IUserDataType | null;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAuthToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    return !!storedAuthToken;
  });
  const [user, setUser] = useState<IUserDataType | null>(() => {
    const storedUser = localStorage.getItem(localStorageKeys.USER);
    const storedUserRole = localStorage.getItem(localStorageKeys.USER_ROLE);
    const storedUserId = localStorage.getItem(localStorageKeys.USER_ID);

    return storedUser && storedUserRole && storedUserId
      ? {
          name: storedUser,
          role: storedUserRole,
          id: storedUserId,
        }
      : null;
  });

  const signIn = useCallback(async ({ email, password }: ILoginData) => {
    const data = await AuthService.login({ email, password });

    if (!data) {
      return;
    }

    localStorage.setItem(localStorageKeys.AUTH_TOKEN, data.token);
    localStorage.setItem(localStorageKeys.USER, data.user.name);
    localStorage.setItem(localStorageKeys.USER_ROLE, data.user.role);
    localStorage.setItem(localStorageKeys.USER_ID, data.user.id);

    setSignedIn(true);
    setUser({ name: data.user.name, role: data.user.role, id: data.user.id });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.AUTH_TOKEN);
    localStorage.removeItem(localStorageKeys.USER);
    localStorage.removeItem(localStorageKeys.USER_ROLE);

    setSignedIn(false);
    setUser(null);
  }, []);

  const value: IAuthContextValue = {
    signedIn,
    signIn,
    user,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
