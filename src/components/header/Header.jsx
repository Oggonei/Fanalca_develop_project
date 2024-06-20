import { MdApps } from "react-icons/md";

const Header = () => {

  const pathname = window.location.pathname;

  return (
    <div className="z-10">
      <header className="fixed left-0 top-0 w-screen bg-gradient-to-l from-cyan-600 to-blue-900 rounded-b-3xl text-white text-3xl p-6 flex items-center shadow-2xl	">
        <MdApps />
        <p className="ml-4 mb-2">{pathname.slice(1)}</p>
      </header>
      <div className="pb-24"></div>
    </div>
  );
};

export default Header;
