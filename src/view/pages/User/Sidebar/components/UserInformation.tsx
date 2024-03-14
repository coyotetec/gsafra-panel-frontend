import { useState } from 'react';
import { Switch } from '../../../../components/Switch';
import { UserService } from '../../../../../app/services/UserService';
import { APIError } from '../../../../../app/errors/APIError';
import { Spinner } from '../../../../components/Loaders/Spinner';
import toast from 'react-hot-toast';

interface UserInformationProps {
  userName: string;
  email: string;
  active: boolean;
  id: string;
}

export function UserInformation({
  userName,
  email,
  active,
  id,
}: UserInformationProps) {
  const [checkedSwitch, setCheckedSwitch] = useState(active);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangeUserStatus() {
    try {
      setIsLoading(true);
      if (checkedSwitch) {
        const userIsInactive = await UserService.inactivateUser(id);
        toast.success(userIsInactive!.message);
        setCheckedSwitch(false);
      } else {
        const userIsActive = await UserService.activateUser(id);
        toast.success(userIsActive!.message);
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
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <strong className="font-semibold text-white">{userName}</strong>
        <small className="text-sm text-white/90">{email}</small>
      </div>
      {isLoading ? (
        <Spinner className="mr-2.5" />
      ) : (
        <Switch checked={checkedSwitch} onChange={handleChangeUserStatus} />
      )}
    </div>
  );
}
