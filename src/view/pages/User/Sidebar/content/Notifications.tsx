import { Notification } from '../components/Notification';

export function Notifications() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Notificações</h1>
      <div className="mt-6 flex flex-col gap-3">
        <Notification
          title="Versão 1.4.3.3"
          body="Melhorias no monitoramento de notas fiscais."
        />

        <Notification
          title="Manutenção no Sistema"
          body="No dia 23/02 o sistema passará por instabilidade entre 14h e 17h."
        />
      </div>
    </>
  );
}
