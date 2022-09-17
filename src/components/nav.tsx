import { IconType } from "react-icons";
import React from "react"
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

type NavButtonProps = {
  label: string,
  icon: IconType,
  href: string
};

const NavButton = ({ label, icon, href }: NavButtonProps) => {
  return (
    <li className="flex gap-3 items-center" >
      <Link href={`/${href}`}>
        <a className="btn peer">
          {React.createElement(icon)}
        </a>
      </Link>
      <span className="w-[5em] opacity-0 translate-x-[-2rem] peer-hover:opacity-100 peer-hover:translate-x-0 transition-all duration-500 ease-in-out">{label}</span>

    </li >
  )
}

type NavigationProps = {
  children: React.ReactNode
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  return (
    <>
      <nav className="absolute left-0 flex flex-col lg:justify-center min-h-screen text-base">
        <ul className="absolute top-20 lg:top-auto transition-all duration-300 opacity-100 lg:opacity-100 text-white pl-5">
          {children}
        </ul>
      </nav>
    </>
  )
}

export { Navigation, NavButton };
