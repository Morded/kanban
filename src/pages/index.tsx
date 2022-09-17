import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { FiLogIn, FiUser } from "react-icons/fi";
import { Navigation, NavButton } from "../components/nav"
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Navigation>
        <NavButton
          label="Sign in"
          icon={FiLogIn}
          href="login"
        />
        <div className="p-5"></div>
        <NavButton
          label="Sign up"
          icon={FiUser}
          href="register"
        />
        <div className="p-5"></div>
      </Navigation>
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-white">
        Morded Kanban
      </h1>
      <p className="text-2xl text-gray-100">An excellent way to track your tasks</p>

      <div className="p-6"></div>

      <Link href="/register" className="uppercase text-gray-800 hover:shadow-md text-2xl border bg-yellow-200 rounded-xl shadow-md py-3 px-6 hover:bg-gray-700 hover:text-yellow-200 border-yellow-200 transition-all duration-200 drop-shadow-2xl"><a>Get started</a></Link>

      <div className="p-6 text-sm text-gray-300 absolute text-center bottom-0 w-full">
        This project is open source on github &gt; <a className="text-yellow-200" href="https://github.com/Morded/kanban">check it out</a>
      </div>
    </>
  );
};

export default Home;

