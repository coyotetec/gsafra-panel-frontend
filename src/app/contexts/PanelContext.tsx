import {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IGetUserResponse } from '../../types/users';
import { APIError } from '../errors/APIError';
import { UserService } from '../services/UserService';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { UserCompanyService } from '../services/UserCompanyService';
import { IGetUserCompaniesResponse } from '../../types/userCompanies';
import { IGetNotificationResponse } from '../../types/notification';
import { NotificationService } from '../services/NotificationService';

interface IPanelContextValue {
  isLoading: boolean;
  notificationIsLoading: boolean;
  users: IGetUserResponse[] | null;
  notifications: IGetNotificationResponse[] | undefined;
  userCompanies: IGetUserCompaniesResponse | null;
  selectedCompany: string | undefined;
  updateUserState: (user: IGetUserResponse) => void;
  changeSelectedCompany: (event: ChangeEvent<HTMLSelectElement>) => void;
  getNotifications: () => void;
}

export const PanelContext = createContext({} as IPanelContextValue);

interface PanelProviderPros {
  children: ReactNode;
}

export function PanelProvider({ children }: PanelProviderPros) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<IGetUserResponse[] | null>(null);
  const [showUsers, setShowUsers] = useState<IGetUserResponse[] | null>(null);
  const [userCompanies, setUserCompanies] =
    useState<IGetUserCompaniesResponse | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>();
  const [notifications, setNotifications] =
    useState<IGetNotificationResponse[]>();
  const [notificationIsLoading, setNotificationIsLoading] = useState(false);

  const { user } = useAuth();

  const filteredUsersByCompany = useMemo(() => {
    if (!users) return null;

    return users.filter(({ companies }) =>
      companies.some(({ id }) => id === selectedCompany),
    );
  }, [users, selectedCompany]);

  const updateUserState = useCallback(
    (user: IGetUserResponse) => {
      const userExists = users?.find(({ id }) => id === user.id);

      if (userExists) {
        const updatedUsers = users!
          .map((u) => (u.id === user.id ? user : u))
          .sort((a, b) => a.name.localeCompare(b.name));
        setUsers(updatedUsers);
        return;
      }

      const orderedUsers = [...(users || []), user].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      setUsers(orderedUsers);
    },
    [users],
  );
  const changeSelectedCompany = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCompany(target.value);
    },
    [],
  );

  const getNotifications = useCallback(async () => {
    try {
      setNotificationIsLoading(true);
      const notifications = await NotificationService.getNotifications();
      setNotifications(notifications);
    } catch (err) {
      if (err instanceof APIError) toast.error(err.message);
    } finally {
      setNotificationIsLoading(false);
    }
  }, []);

  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true);
        const usersData = await UserService.getUsers();
        setUsers(usersData);
      } catch (err) {
        if (err instanceof APIError) {
          toast.error(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getUsers();
    getNotifications();
  }, []);

  useEffect(() => {
    async function getUserCompanies(userId: string) {
      const userCompanies =
        await UserCompanyService.getCompaniesByUserId(userId);
      setSelectedCompany(userCompanies.companies[0].id);
      setUserCompanies(userCompanies);
    }

    user && getUserCompanies(user.id);
  }, [user]);

  useEffect(() => {
    setShowUsers(filteredUsersByCompany);
  }, [filteredUsersByCompany]);

  const value: IPanelContextValue = {
    users: showUsers,
    isLoading,
    notificationIsLoading,
    selectedCompany,
    notifications,
    userCompanies,
    updateUserState,
    changeSelectedCompany,
    getNotifications,
  };
  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
}
