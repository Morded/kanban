import { IconType } from "react-icons";
import React, { useEffect, useState } from "react"
import Link from "next/link";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";

const mediumWidth = 767;

type NavButtonProps = {
  label?: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
  onlyMobile?: boolean;
  isHamburger?: boolean;
};

const NavButton = ({ label, icon, href, onClick, onlyMobile, isHamburger }: NavButtonProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, [])

  return (
    <li className="relative flex gap-3 items-center w-full" >
      {
        href ?
          <Link href={`/${href}`}>
            <a className={`flex gap-3 justify-start items-center w-full md:w-auto btn peer ${onlyMobile && 'md:hidden'}`} >
              <div className="pl-2 md:pl-0">
                {React.createElement(icon)}
              </div>
              {(label && width < mediumWidth) &&
                <span className="text-lg w-[5em]">{label}</span>
              }
            </a>
          </Link>
          :
          <button
            onClick={onClick}
            className={`btn peer ${onlyMobile && 'md:hidden'} ${isHamburger === true && 'rounded-full ml-2'} `}
          >
            {React.createElement(icon)}
          </button>
      }
      {(label && width >= mediumWidth) &&
        <span className="absolute w-[6rem] font-bold bg-black px-2 md:opacity-0 md:translate-x-[-2rem] peer-hover:opacity-100 peer-hover:translate-x-16 transition-all duration-500 ease-in-out">{label}</span>
      }

    </li >
  )
}

type NavigationProps = {
  children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, [])

  return (
    <>
      <nav className={`flex z-50 flex-col md:items-center md:justify-center min-h-screen text-base ${width < mediumWidth && "absolute"} ${(isOpen && width < mediumWidth) && "bg-slate-700 md:bg-inherit w-3/4"}`}>
        <ul className="md:w-16 w-full mt-5 md:mt-0 md:top-auto gap-5 transition-all duration-300 text-white md:pl-2 flex flex-col">
          {width < mediumWidth &&
            <NavButton
              onClick={() => setIsOpen(!isOpen)}
              icon={isOpen ? RiCloseLine : RiMenu4Line}
              onlyMobile={true}
              isHamburger={true}
            />
          }

          {(isOpen === true || width >= mediumWidth) && children}
        </ul>
      </nav>
    </>
  )
}

export { Navigation, NavButton };
