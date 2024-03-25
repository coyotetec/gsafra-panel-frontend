import { formatUTCtoDateString } from '../../../../../app/utils/formatUTCtoDateString';

interface NotificationProps {
  title: string;
  body: string;
  date: Date;
}

export function Notification({ body, title, date }: NotificationProps) {
  return (
    <div className="relative rounded-xl bg-primary-400 px-3 py-2.5">
      <h1 className="text-sm font-semibold text-white">{title}</h1>
      <p className="text-xs text-white/80">{body}</p>
      <span className=" block w-full text-right text-[0.625rem] italic leading-none text-primary-50">
        {formatUTCtoDateString(date)}
      </span>
    </div>
  );
}
