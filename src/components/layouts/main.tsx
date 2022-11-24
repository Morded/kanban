import Head from "next/head";
import { NextRouter } from "next/router";
import React from 'react';
import { Navigation } from '../nav'

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
        <Navigation />

        <main className="w-full flex flex-col items-center justify-start min-h-screen">
          {children}
        </main>
      </div>

      <div id="portal"></div>

    </>
  )
}

export default Main;

