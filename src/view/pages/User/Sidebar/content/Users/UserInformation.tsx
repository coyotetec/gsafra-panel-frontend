import { useState } from 'react';
import { Switch } from '../../../../../components/Switch';
import { UserService } from '../../../../../../app/services/UserService';
import { APIError } from '../../../../../../app/errors/APIError';
import { Spinner } from '../../../../../components/Loaders/Spinner';
import toast from 'react-hot-toast';
import { IconEdit } from '@tabler/icons-react';

interface UserInformationProps {
  userName: string;
  email: string;
  active: boolean;
  id: string;
  handleEditUser: () => void;
}

export function UserInformation({
  userName,
  email,
  active,
  id,
  handleEditUser,
}: UserInformationProps) {
  const [checkedSwitch, setCheckedSwitch] = useState(active);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangeUserStatus() {
    try {
      setIsLoading(true);
      if (checkedSwitch) {
        const userIsInactive = await UserService.inactivateUser(id);
        toast(userIsInactive!.message);
        setCheckedSwitch(false);
      } else {
        const userIsActive = await UserService.activateUser(id);
        toast(userIsActive!.message);
        setCheckedSwitch(true);
      }
    } catch (error) {
      setCheckedSwitch(active);
      if (error instanceof APIError) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="g flex items-center justify-between">
      <div className="flex max-w-48 flex-col truncate">
        <strong className="flex items-center gap-1 font-semibold text-white">
          {userName}
          <IconEdit
            stroke={2}
            size={14}
            className="cursor-pointer"
            onClick={handleEditUser}
          />
        </strong>
        <small className="truncate text-sm text-white/90">{email}</small>
      </div>
      {isLoading ? (
        <Spinner className="mr-2.5" />
      ) : (
        <Switch checked={checkedSwitch} onChange={handleChangeUserStatus} />
      )}
    </div>
  );
}
