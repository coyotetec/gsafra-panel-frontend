import logo from '../../assets/images/logo-horizontal.svg';

export function Header() {
  return (
    <header className="h-32 border-2 border-black bg-white">
      <div className="mx-auto my-auto max-w-8xl">
        <img src={logo} alt="Logo Gsafra Horizontal" />
      </div>
    </header>
  );
}
