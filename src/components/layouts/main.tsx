import Head from "next/head";
import { NextRouter } from "next/router";
import React from 'react';
import { FiColumns, FiGrid, FiLayout, FiLogOut } from "react-icons/fi";
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
            label="Tasks"
            icon={FiColumns}
            href="tasks"
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

        <main className="w-full flex flex-col items-center justify-start min-h-screen p-2 md:p-0">
          {children}
        </main>
      </div>

      <div id="portal"></div>

    </>
  )
}

export default Main;
