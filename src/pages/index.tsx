import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { FiLogIn, FiUser } from "react-icons/fi";
import { IconType } from "react-icons";
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"

export function Component() {
}

const Home: NextPage = () => {
  // const { data: session } = useSession()
  // if (session) {
  //   return <>
  //     Signed in as {session.user.email} <br />
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  // return <>
  //   Not signed in <br />
  //   <button onClick={() => signIn()}>Sign in</button>
  // </>

  return (
    <>
      <Head>
        <title>Morded Kanban</title>
        <meta name="description" content="A kanban app to follow your tasks progress." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="absolute flex flex-col justify-center min-h-screen text-base">
        <ul className="text-white pl-5">
          <NavButton
            label="Sign in"
            icon={FiLogIn}
          />
          <div className="p-5"></div>
          <NavButton
            label="Sign up"
            icon={FiUser}
          />
        </ul>
      </nav>
      <main className="container w-full mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-white">
          Morded Kanban
        </h1>
        <p className="text-2xl text-gray-100">An excellent way to track your tasks</p>

        <div className="p-6"></div>

        <button className="uppercase text-gray-800 hover:shadow-md text-2xl border bg-yellow-200 rounded-xl shadow-md py-3 px-6 hover:bg-gray-700 hover:text-yellow-200 border-yellow-200 transition-all duration-200 drop-shadow-2xl">Get started</button>

        <div className="p-6 text-sm text-gray-300 absolute text-center bottom-0 w-full">
          This project is open source on github &gt; <a className="text-yellow-200" href="https://github.com/Morded/kanban">check it out</a>
        </div>
      </main>
    </>
  );
};

export default Home;

type NavButtonProps = {
  label: string,
  icon: IconType
};

const NavButton = ({ label, icon }: NavButtonProps) => {
  return (
    <li className="flex gap-3 items-center" >
      <a className="btn peer" href="#">
        {React.createElement(icon)}
      </a>
      <span className="opacity-0 translate-x-[-2rem] peer-hover:opacity-100 peer-hover:translate-x-0 transition-all duration-500 ease-in-out">{label}</span>

    </li>
  )
}

