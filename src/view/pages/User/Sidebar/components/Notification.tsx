interface NotificationProps {
  title: string;
  body: string;
  date?: string;
}

export function Notification({ body, title }: NotificationProps) {
  return (
    <div className="relative rounded-xl bg-primary-400 px-3 py-2.5">
      <h1 className="text-sm font-semibold text-white">{title}</h1>
      <p className="text-xs text-white/80">{body}</p>
      <span className=" block w-full text-right text-[0.625rem] italic leading-none text-primary-50">
        há 2 dias
      </span>
    </div>
  );
}
