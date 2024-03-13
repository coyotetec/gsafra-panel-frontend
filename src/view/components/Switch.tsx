import { useState } from 'react';
import { UserService } from '../../app/services/UserService';

interface SwitchProps {
  active: boolean;
  userId: string;
}

export function Switch({ active, userId }: SwitchProps) {
  const [checkedSwitch, setCheckedSwitch] = useState(active);

  async function handleChangeUserStatus(userId: string) {
    if (checkedSwitch) {
      const userIsInactive = await UserService.inactivateUser(userId);
      userIsInactive ? setCheckedSwitch(false) : setCheckedSwitch(true);
    } else {
      const userIsActive = await UserService.activateUser(userId);
      userIsActive ? setCheckedSwitch(true) : setCheckedSwitch(false);
    }
  }

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checkedSwitch}
        onChange={() => handleChangeUserStatus(userId)}
      />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-500 after:absolute after:start-[4px] after:top-[4px] after:h-4 after:w-4 after:rounded-full after:bg-gray-600 after:transition-all after:duration-300 after:content-[''] peer-checked:bg-secondary-500 peer-checked:after:translate-x-5 peer-checked:after:bg-secondary-40"></div>
    </label>
  );
}
