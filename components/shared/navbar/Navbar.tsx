"use client";
import Routing from "@/lib/routing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  route: string;
}

const NavLinks: NavLink[] = [
  {
    name: "Home",
    route: Routing.root,
  },
  {
    name: "Folders",
    route: Routing.folders.index,
  },
  {
    name: "About",
    route: Routing.about,
  },
  {
    name: "Contact",
    route: Routing.contact,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-screen-2xl mx-auto py-2.5 px-4 flex items-center justify-between">
        <Link href={Routing.root} className="flex items-center gap-x-4">
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
        <div className="hidden sm:block">
          <ul className="flex items-center gap-x-4">
            {NavLinks.map((link) => {
              const isCurrentPath = pathname === link.route;
              return (
                <li key={link.name}>
                  <Link
                    href={link.route}
                    className={cn("hover:text-blue-600", {
                      "text-blue-600": isCurrentPath,
                    })}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
