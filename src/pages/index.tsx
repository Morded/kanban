import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { FiLogIn, FiUser } from "react-icons/fi";
import { Navigation, NavButton } from "../components/nav"
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl sm:text-5xl align-center md:text-[5rem] leading-normal font-extrabold text-white">
        Morded Kanban
      </h1>
      <p className="text-lg md:text-2xl align-center text-gray-100">An excellent way to track your tasks</p>

      <div className="p-6"></div>

      <Link href="/register"><a className="uppercase text-gray-800 hover:shadow-md text-2xl border bg-yellow-200 rounded-xl shadow-md py-3 px-6 hover:bg-gray-700 hover:text-yellow-200 border-yellow-200 transition-all duration-200 drop-shadow-2xl">Get started</a></Link>
    </div>
  );
};

export default Home;

