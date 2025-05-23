import { useAuth } from "../../../app/hooks/useAuth";
import { usePanelContext } from "../../../app/hooks/usePanelContext";
import dashboardIcon from "../../../assets/icon/dashboard.svg";
import systemIcon from "../../../assets/icon/system.svg";
import { CardPanel } from "../../components/CardPanel";

export function Panel() {
  const { userCompanies, } = usePanelContext();
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-3.5xl font-bold">Painel de Acessos</h1>
      <span>Clique um dos acessos abaixo para ser redirecionado</span>
      <div className="mt-6 flex flex-wrap gap-6">
        {userCompanies?.companies.map(({ name, id, externalId }, index) => (
          !userCompanies.userFirebirdId[index] ? null :
            <div key={id}>
              <h2 className="text-lg font-medium">{name}</h2>
              <div className="mt-2 flex gap-3">
                <a
                  href={`https://acesso.gsafra.com/index2.html?userId=${userCompanies.userFirebirdId[index]}&email=${user?.name}&companyId=${externalId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardPanel
                    image={systemIcon}
                    descriptionImg="Ícone do sistema"
                    title="Sistema"
                    farm={name}
                  />
                </a>
                <a
                  href={`https://dashboard.gsafra.com/?idEmpresa=${externalId}&idUsuario=${userCompanies.userFirebirdId[index]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CardPanel
                    image={dashboardIcon}
                    descriptionImg="Ícone de dashboard"
                    title="Dashboard"
                    farm={name}
                  />
                </a>
              </div>
            </div>
        ))}
      </div>
    </>
  );
}
