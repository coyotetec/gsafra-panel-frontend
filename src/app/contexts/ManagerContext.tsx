import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react';
import { IGetCompanyResponse } from '../../types/company';
import { IGetUserResponse } from '../../types/users';
import { IGetNotificationResponse } from '../../types/notification';

interface ManagerProviderProps {
  children: ReactNode;
}

interface IManagerContextValue {
  companies: IGetCompanyResponse[];
  setCompanies: Dispatch<SetStateAction<IGetCompanyResponse[]>>;
  companiesLoaded: MutableRefObject<boolean>;

  users: IGetUserResponse[];
  setUsers: Dispatch<SetStateAction<IGetUserResponse[]>>;
  usersLoaded: MutableRefObject<boolean>;

  notifications: IGetNotificationResponse[];
  setNotifications: Dispatch<SetStateAction<IGetNotificationResponse[]>>;
  notificationsLoaded: MutableRefObject<boolean>;
}

export const ManagerContext = createContext({} as IManagerContextValue);

export function ManagerProvider({ children }: ManagerProviderProps) {
  const [companies, setCompanies] = useState<IGetCompanyResponse[]>([]);
  const companiesLoaded = useRef<boolean>(false);
  const [users, setUsers] = useState<IGetUserResponse[]>([]);
  const usersLoaded = useRef<boolean>(false);
  const [notifications, setNotifications] = useState<
    IGetNotificationResponse[]
  >([]);
  const notificationsLoaded = useRef<boolean>(false);

  const value: IManagerContextValue = {
    companies,
    setCompanies,
    companiesLoaded,

    users,
    setUsers,
    usersLoaded,

    notifications,
    setNotifications,
    notificationsLoaded,
  };

  return (
    <ManagerContext.Provider value={value}>{children}</ManagerContext.Provider>
  );
}
