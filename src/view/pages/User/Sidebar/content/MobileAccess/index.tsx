import { usePanelContext } from '../../../../../../app/hooks/usePanelContext';
import appleLogo from '../../../../../../assets/icon/apple.svg';
import googlePlayLogo from '../../../../../../assets/icon/google-play.svg';
import qrCode from '../../../../../../assets/icon/qr-code.svg';
import { SelectCompany } from '../../../../../components/SelectCompany';

export function MobileAccess() {
  const { userCompanies, companyData } = usePanelContext();

  return (
    <>
      <h1 className="text-2xl font-semibold text-white">Acesso Aplicativo</h1>
      {userCompanies && userCompanies.companies.length > 1 && (
        <div className="absolute top-16">
          <SelectCompany />
        </div>
      )}
      <div className="sidebar-scroll sidebar-scroll-thumb mb-4 mt-6 flex h-full flex-1 flex-col items-stretch gap-2 overflow-auto pr-2">
        <p className="text-sm text-gray-400">
          Para acessar o aplicativo GSafra use as credenciais abaixo:
        </p>
        <div className="mt-1">
          <span className="text-sm font-medium text-primary-50">
            Código da Empresa:
          </span>
          <div className="flex flex-col items-center justify-center rounded-md bg-primary-600 p-2.5">
            <span className="font-semibold text-gray-400">
              #{companyData?.externalId}
            </span>
          </div>
        </div>
        <div>
          <span className="text-sm font-medium text-primary-50">Senha:</span>
          <div className="flex flex-col items-center justify-center rounded-md bg-primary-600 p-2.5">
            <span className="font-semibold text-gray-400">
              {companyData?.password}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1">
        <img src={qrCode} alt="QR Code" className="h-[122px] rounded-lg" />
        <div className="flex flex-col gap-2">
          <a
            href="https://apps.apple.com/br/app/gsafra/id6478771928"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-900 p-2.5"
          >
            <img src={appleLogo} alt="Logo Apple" />
            <div>
              <p className="-mb-0.5 text-2xs font-medium text-white">
                DOWNLOAD
              </p>
              <p className="font-medium text-white">Apple</p>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.gsafra.gsafra"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-900 p-2.5"
          >
            <img src={googlePlayLogo} alt="Logo Google Play" />
            <div>
              <p className="-mb-0.5 text-2xs font-medium text-white">
                DOWNLOAD
              </p>
              <p className="font-medium text-white">Android</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
