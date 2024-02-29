import systemIcon from '../../../assets/icon/system.svg';
import dashboardIcon from '../../../assets/icon/dashboard.svg';
import { CardPanel } from '../../components/CardPanel';

export function Panel() {
  return (
    <>
      <h1 className="text-3.5xl font-bold">Painel de Acessos</h1>
      <span>Clique um dos acessos abaixo para ser redirecionado</span>
      <section className="mt-6 flex gap-3">
        <CardPanel
          image={systemIcon}
          descriptionImg="Ícone do sistema"
          title="Sistema"
          farm="Fazenda Ana Júlia"
        />
        <CardPanel
          image={dashboardIcon}
          descriptionImg="Ícone de dashboard"
          title="Dashboard"
          farm="Fazenda Ana Júlia"
        />
      </section>
    </>
  );
}
