import Head from "next/head";

const Main = ({ children, router }) => {
  return (
    <>
      <Head>
        <title>Morded Kanban</title>
        <meta name="description" content="A kanban app to follow your tasks progress." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        {children}

        <div className="p-6 text-sm text-gray-300 absolute text-center bottom-0 w-full">
          This project is open source on github &gt; <a className="text-yellow-200" href="https://github.com/Morded/kanban">check it out</a>
        </div>
      </main>
    </>
  )
}

export default Main;
