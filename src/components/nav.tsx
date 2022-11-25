import { IconType } from "react-icons";
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
import { FiColumns, FiGrid, FiLayout, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { motion } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router";

const mediumWidth = 767;

type NavButtonProps = {
  label?: string;
  icon: IconType;
  href?: string;
  onClick: () => void;
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
            <div onClick={onClick} className={`cursor-pointer flex gap-3 justify-start items-center w-full md:w-auto btn peer ${onlyMobile && 'md:hidden'}`} >
              <div className="pl-2 md:pl-0">
                {React.createElement(icon)}
              </div>
              {(label && width < mediumWidth) &&
                <span className="text-lg w-[5em]">{label}</span>
              }
            </div>
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

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const menuRef = useRef(null);
  const { data: session } = useSession()
  const router = useRouter();
  useOutsideCloser(menuRef);

  function useOutsideCloser(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, [])

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/login' })
      .then(data => router.push(data.url));

    setIsOpen(false);
  }

  return (
    <>
      <nav
        ref={menuRef}
        className={`flex z-50 flex-col md:items-center md:justify-center md:min-h-screen text-base 
        ${width < mediumWidth ? "absolute" : ""} 
        ${(isOpen === true && width < mediumWidth) ? "bg-black bg-opacity-80 md:bg-inherit w-3/4 min-h-screen" : ''}`}
      >
        <motion.ul
          initial={{
            opacity: 0,
            translateX: '-10px'
          }}
          animate={{
            opacity: 1,
            translateX: '0px'
          }}
          className="md:w-16 w-full mt-5 md:mt-0 md:top-auto gap-5 transition-all duration-300 text-white md:pl-2 flex flex-col">
          {width < mediumWidth &&
            <NavButton
              onClick={() => setIsOpen(!isOpen)}
              icon={isOpen ? RiCloseLine : RiMenu4Line}
              onlyMobile={true}
              isHamburger={true}
            />
          }

          {(isOpen === true || width >= mediumWidth) &&
            <>
              {session?.user ?
                <>
                  <NavButton
                    label="Dashboard"
                    icon={FiLayout}
                    href="dashboard"
                    onClick={() => setIsOpen(false)}
                  />
                  <NavButton
                    label="Tasks"
                    icon={FiColumns}
                    href="tasks"
                    onClick={() => setIsOpen(false)}
                  />
                  <NavButton
                    label="Categories"
                    icon={FiGrid}
                    href="categories"
                    onClick={() => setIsOpen(false)}
                  />
                  <NavButton
                    label="Sign out"
                    icon={FiLogOut}
                    onClick={() => handleSignOut()}
                  />
                </>
                : <>
                  <NavButton
                    label="Sign in"
                    icon={FiLogIn}
                    href="login"
                    onClick={() => setIsOpen(false)}
                  />
                  <NavButton
                    label="Sign up"
                    icon={FiUser}
                    href="register"
                    onClick={() => setIsOpen(false)}
                  />
                </>
              }
            </>
          }
        </motion.ul>
      </nav>
    </>
  )
}

export { Navigation, NavButton };
