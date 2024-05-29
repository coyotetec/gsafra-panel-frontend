import { LogoHorizontal } from "../../components/Logos/LogoHorizontal";
import appleLogo from '../../../assets/icon/apple.svg'
import googlePlayLogo from '../../../assets/icon/google-play.svg'

export function AppLinks() {
  return (
    <div>
      <header className="h-[20vh] flex items-center justify-center shadow-2xl gap-2">
        <LogoHorizontal />
        <span className="rounded-full bg-primary-300 px-3 py-2 text-sm font-bold leading-none text-primary-50">
            APP
          </span>
      </header>
      <main className="flex h-[65vh] flex-col w-[80vw] m-auto justify-center gap-3">
          <a href="https://apps.apple.com/br/app/gsafra/id6478771928" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 w-full justify-center bg-black p-3 rounded-lg'>
            <img src={appleLogo} alt='Logo Apple' />
            <div>
              <p className='text-white font-medium text-2xs -mb-0.5'>BAIXAR NA</p>
              <p className='text-white font-medium'>App Store</p>
            </div>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.gsafra.gsafra" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 w-full justify-center bg-black p-3 rounded-lg'>
            <img src={googlePlayLogo} alt='Logo Google Play' />
            <div>
              <p className='text-white font-medium text-2xs -mb-0.5'>BAIXAR NO</p>
              <p className='text-white font-medium'>Google Play</p>
            </div>
          </a>
      </main>
      <footer className="flex items-center justify-center h-[15vh] shadow-2xl">
        <span className="text-black/40">© Copyright 2024 - Coyote Tecnologia</span>
      </footer>
    </div>
  )
}