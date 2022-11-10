import Head from "next/head";
import { NextRouter } from "next/router";
import React from 'react';

type MainProps = {
  children: React.ReactNode,
  router: NextRouter
}

const Main: React.FC<MainProps> = ({ children, router }) => {
  return (
    <>
      <Head>
        <title>Morded Kanban</title>
        <meta name="description" content="A kanban app to follow your tasks progress." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        {children}
      </main>
      <footer className="p-6 text-sm text-gray-300 fixed text-center bottom-0 w-full">
        This project is open source on github &gt; <a className="text-yellow-200" href="https://github.com/Morded/kanban">check it out</a>
      </footer>
    </>
  )
}

export default Main;
