import { GitHub, LinkedIn } from "@mui/icons-material";
import { Icon } from "@mui/material";
import Link from "next/link";

interface NavLink {
  name: string;
  route: string;
}

interface IconNavLink extends NavLink {
  icon: React.ReactNode;
}

const NavLinks: NavLink[] = [
  {
    name: "About",
    route: "/about",
  },
  {
    name: "API",
    route: "/api",
  },
  {
    name: "Contact",
    route: "/contact",
  },
];

const IconNavLinks: IconNavLink[] = [
  {
    name: "GitHub",
    route: "https://github.com/aleksandrmakarov-dev",
    icon: <GitHub />,
  },
  {
    name: "LinkedIn",
    route: "https://www.linkedin.com/in/aleksandr-makarov-397547252/",
    icon: <LinkedIn />,
  },
];

export default function Footer() {
  return (
    <div className="border-t border-gray-200 p-4 bg-white flex flex-col sm:flex-row items-center justify-between">
      <div className="flex flex-col sm:flex-row items-center gap-x-4 text-gray-600">
        <span>© 2023 aleksandrmakarov.com</span>
        {NavLinks.map((link) => (
          <Link
            key={link.name}
            className="underline hover:text-black"
            href={link.route}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex mt-5 sm:mt-0 items-center gap-x-4 text-gray-600">
        {IconNavLinks.map((link) => (
          <Link
            key={link.name}
            className="underline hover:text-black"
            href={link.route}
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
