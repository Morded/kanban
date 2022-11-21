import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { FiLogIn, FiUser } from "react-icons/fi";
import { Navigation, NavButton } from "../components/nav"
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen text-center">
      <h1 className="text-4xl sm:text-5xl align-center md:text-[5rem] leading-normal font-extrabold text-white">
        Morded Kanban
      </h1>
      <p className="text-lg md:text-2xl align-center text-gray-100">An excellent way to track your tasks</p>

      <div className="p-6"></div>

      <Link href="/register"><a className="uppercase text-white hover:shadow-md text-2xl shadow-md py-3 px-6 hover:bg-gray-700 transition-all hover:scale-105 duration-200 drop-shadow-2xl drop-shadow-2xl font-bold rounded-3xl bg-gradient-to-r from-violet-800 to-fuchsia-800
                duration-300 transition-all ease-in-out hover:from-violet-700 hover:to-fuchsia-700">Get started</a></Link>
    </div>
  );
};

export default Home;

