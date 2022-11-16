import Head from "next/head";
import { NextRouter } from "next/router";
import React from 'react';
import { FiGrid, FiLayout, FiLogOut } from "react-icons/fi";
import { Navigation, NavButton } from '../nav'

type MainProps = {
  children: React.ReactNode,
  router: NextRouter
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Morded Kanban</title>
        <meta name="description" content="A kanban app to follow your tasks progress." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row">
        <Navigation>
          <NavButton
            label="Dashboard"
            icon={FiLayout}
            href="dashboard"
          />
          <NavButton
            label="Categories"
            icon={FiGrid}
            href="categories"
          />
          <NavButton
            label="Sign out"
            icon={FiLogOut}
            href="logout"
          />
        </Navigation>

        <main className=" w-full flex flex-col items-center justify-start min-h-screen p-2 md:p-0">
          {children}
        </main>
      </div>

      <div id="portal"></div>

      <footer className="p-6 text-sm text-gray-300 fixed text-center bottom-0 w-full">
        This project is open source on github &gt; <a className="text-yellow-200" href="https://github.com/Morded/kanban">check it out</a>
      </footer>
    </>
  )
}

export default Main;
