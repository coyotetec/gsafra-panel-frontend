import {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GetUsersResponseType } from '../../types/users';
import { APIError } from '../errors/APIError';
import { UserService } from '../services/UserService';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { UserCompanyService } from '../services/UserCompanyService';
import { IGetUserCompaniesResponse } from '../../types/userCompanies';
import { IGetNotificationResponse } from '../../types/notification';
import { NotificationService } from '../services/NotificationService';

interface ISidebarContextValue {
  isLoading: boolean;
  users: GetUsersResponseType[] | null;
  notifications: IGetNotificationResponse[] | undefined;
  userCompanies: IGetUserCompaniesResponse[] | null;
  selectedCompany: string | undefined;
  updateUserState: (user: GetUsersResponseType) => void;
  changeSelectedCompany: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SidebarContext = createContext({} as ISidebarContextValue);

interface SidebarProviderPros {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderPros) {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<GetUsersResponseType[] | null>(null);
  const [showUsers, setShowUsers] = useState<GetUsersResponseType[] | null>(
    null,
  );
  const [userCompanies, setUserCompanies] = useState<
    IGetUserCompaniesResponse[] | null
  >(null);
  const [selectedCompany, setSelectedCompany] = useState<string>();
  const [notifications, setNotifications] =
    useState<IGetNotificationResponse[]>();

  const { user } = useAuth();

  const filteredUsersByCompany = useMemo(() => {
    if (!users) return null;

    return users.filter(({ companies }) =>
      companies.some(({ id }) => id === selectedCompany),
    );
  }, [users, selectedCompany]);

  const updateUserState = useCallback((user: GetUsersResponseType) => {
    setUsers((prevState) => [...(prevState || []), user]);
  }, []);
  const changeSelectedCompany = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCompany(target.value);
    },
    [],
  );

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

    async function getNotifications() {
      try {
        setIsLoading(true);
        const notifications = await NotificationService.getNotifications();
        console.log(notifications);
        setNotifications(notifications);
      } catch (err) {
        if (err instanceof APIError) toast.error(err.message);
      }
    }

    getUsers();
    getNotifications();
  }, []);

  useEffect(() => {
    async function getUserCompanies(userId: string) {
      const userCompanies =
        await UserCompanyService.getCompaniesByUserId(userId);
      setSelectedCompany(userCompanies[0].id);
      setUserCompanies(userCompanies);
    }

    user && getUserCompanies(user.id);
  }, [user]);

  useEffect(() => {
    setShowUsers(filteredUsersByCompany);
  }, [filteredUsersByCompany]);

  const value: ISidebarContextValue = {
    users: showUsers,
    isLoading,
    selectedCompany,
    notifications,
    userCompanies,
    updateUserState,
    changeSelectedCompany,
  };
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
