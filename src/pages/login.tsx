import type { NextPage } from "next";
import React from "react"
// import { useSession, signIn, signOut } from "next-auth/react"

export function Component() {
}

const Login: NextPage = () => {
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
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-white">
        Login
      </h1>
      <p className="text-2xl text-gray-100">An excellent way to track your tasks</p>

      <div className="p-6"></div>

      <button className="uppercase text-gray-800 hover:shadow-md text-2xl border bg-yellow-200 rounded-xl shadow-md py-3 px-6 hover:bg-gray-700 hover:text-yellow-200 border-yellow-200 transition-all duration-200 drop-shadow-2xl">Get started</button>
    </>
  );
};

export default Login;

