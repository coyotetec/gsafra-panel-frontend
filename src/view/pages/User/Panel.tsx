import systemIcon from '../../../assets/icon/system.svg';
import dashboardIcon from '../../../assets/icon/dashboard.svg';
import { CardPanel } from '../../components/CardPanel';
import { usePanelContext } from '../../../app/hooks/usePanelContext';

export function Panel() {
  const { userCompanies } = usePanelContext();
  return (
    <>
      <h1 className="text-3.5xl font-bold">Painel de Acessos</h1>
      <span>Clique um dos acessos abaixo para ser redirecionado</span>
      <div className="mt-6 flex flex-wrap gap-6">
        {userCompanies?.map(({ name, id }) => (
          <div key={id}>
            <h2 className="text-lg font-medium">{name}</h2>
            <div className="mt-2 flex gap-3">
              <CardPanel
                image={systemIcon}
                descriptionImg="Ícone do sistema"
                title="Sistema"
                farm={name}
              />
              <CardPanel
                image={dashboardIcon}
                descriptionImg="Ícone de dashboard"
                title="Dashboard"
                farm={name}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
