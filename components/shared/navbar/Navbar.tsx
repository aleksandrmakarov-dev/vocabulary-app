interface NavLink {
  name: string;
  route: string;
}

const NavLinks = [];

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-screen-2xl mx-auto py-2.5 px-5 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Vocabulary App
          </span>
        </a>
      </div>
    </nav>
  );
}
