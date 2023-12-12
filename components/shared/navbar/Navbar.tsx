import Routing from "@/lib/routing";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  name: string;
  route: string;
}

const NavLinks = [];

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-screen-2xl mx-auto py-2.5 px-5 flex items-center justify-between">
        <Link href={Routing.root} className="flex items-center space-x-3">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Vocabulary App
          </span>
        </Link>
      </div>
    </nav>
  );
}
