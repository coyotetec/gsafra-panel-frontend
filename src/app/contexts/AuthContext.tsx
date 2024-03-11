import { ReactNode, createContext, useCallback, useState } from 'react';
import { ILoginData } from '../../types/authentication';
import { AuthService } from '../services/AuthService';
import { localStorageKeys } from '../config/localStorageKeys';

interface AuthProviderProps {
  children: ReactNode;
}

type UserDataType = {
  name: string;
  role: string;
};

interface IAuthContextValue {
  signedIn: boolean;
  signIn: (payload: ILoginData) => Promise<void>;
  user: UserDataType | null;
  signOut: () => void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAuthToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    return !!storedAuthToken;
  });
  const [user, setUser] = useState<UserDataType | null>(() => {
    const storedUser = localStorage.getItem(localStorageKeys.USER);
    const storedUserRole = localStorage.getItem(localStorageKeys.USER_ROLE);

    return storedUser && storedUserRole
      ? {
          name: storedUser,
          role: storedUserRole,
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

    setSignedIn(true);
    setUser({ name: data.user.name, role: data.user.role });
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
