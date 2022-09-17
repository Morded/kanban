import { IconType } from "react-icons";
import React from "react"
import Link from "next/link";

type NavButtonProps = {
  label: string,
  icon: IconType,
  href: string
};

const NavButton = ({ label, icon, href }: NavButtonProps) => {
  return (
    <li className="flex gap-3 items-center" >
      <Link className="btn peer" href={`/${href}`}>
        <a>
          {React.createElement(icon)}
        </a>
      </Link>
      <span className="opacity-0 translate-x-[-2rem] peer-hover:opacity-100 peer-hover:translate-x-0 transition-all duration-500 ease-in-out">{label}</span>

    </li >
  )
}

type NavigationProps = {
  children: React.ReactNode
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  return (
    <nav className="absolute left-0 flex flex-col justify-center min-h-screen text-base">
      <ul className="text-white pl-5">
        {children}
      </ul>
    </nav>
  )
}

export { Navigation, NavButton };
