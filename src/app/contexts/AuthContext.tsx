import { ReactNode, createContext, useCallback, useState } from 'react';
import { ILoginData } from '../../types/authentication';
import { AuthService } from '../services/AuthService';
import { localStorageKeys } from '../config/localStorageKeys';
// import { localStorageKeys } from '../config/localStorageKeys';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextValue {
  signedIn: boolean;
  signIn: (payload: ILoginData) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAuthToken = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
    return storedAuthToken ? JSON.parse(storedAuthToken) : null;
  });

  const signIn = useCallback(async ({ email, password }: ILoginData) => {
    const data = await AuthService.login({ email, password });
    console.log(data);

    if (!data) {
      return;
    }

    localStorage.setItem(localStorageKeys.AUTH_TOKEN, data.token);
    localStorage.setItem(localStorageKeys.USER, data.user.name);
    localStorage.setItem(localStorageKeys.USER_ROLE, data.user.role);

    setSignedIn(true);
  }, []);

  const value: IAuthContextValue = {
    signedIn,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
