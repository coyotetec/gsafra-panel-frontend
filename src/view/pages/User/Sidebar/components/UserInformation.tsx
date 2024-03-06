import { Switch } from '../../../../components/Switch';

interface UserInformationProps {
  userName: string;
  email: string;
  active?: boolean;
}

export function UserInformation({ userName, email }: UserInformationProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <strong className="font-semibold text-white">{userName}</strong>
        <small className="text-sm text-white/90">{email}</small>
      </div>
      <Switch />
    </div>
  );
}
