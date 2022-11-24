import type { NextPage } from "next";
import React, { FormEventHandler, useState } from "react"
import { signIn } from "next-auth/react"
import { Form, Button, Input } from "../components/form"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { setErrorMap } from "zod";

const Login: NextPage = () => {
  const [userInfo, setUserInfo] = useState({ name: '', password: '' })
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('')
  const getUser = trpc.useQuery(["user.get", { username: userInfo.name || '' }]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setErrorMessage(() => '');
    e.preventDefault();

    const username = userInfo.name;
    const password = userInfo.password;

    if (!username) { setErrorMessage('Username is required'); return }
    if (!password) { setErrorMessage('Password is required'); return }

    if (!getUser.data) { setErrorMessage('No account with that username'); return }

    await signIn("credentials", {
      username: userInfo.name,
      password: userInfo.password,
      redirect: false,
      callbackUrl: '/dashboard',
    })
      .then(data => router.push(data?.url ?? '/dashboard'))

    setErrorMessage('The password does not match the username')
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col pt-20 md:pt-0 justify-start md:justify-center items-center min-h-screen">
        <div className='px-2'>
          <h1 className="text-5xl md:text-[4rem] leading-normal font-extrabold text-white">
            Sign in
          </h1>
          <div className="p-6"></div>

          <form className="flex flex-col" method="post" onSubmit={handleSubmit} >
            {errorMessage !== '' &&
              <motion.div
                initial={{
                  opacity: 0,
                  translateY: '-20px'
                }}
                animate={{
                  opacity: 1,
                  translateY: 0
                }}
                exit={{
                  opacity: 0,
                  translateY: '-20px'
                }}
                className="duration-150 w-[16rem] text-center text-red-600 word-break py-5"
              >
                {errorMessage}
              </motion.div>
            }
            <label className="text-sl text-gray-400 pb-2">Username</label>
            <input
              className="py-2 px-4 focus:outline-none glassmorph-dark text-white border border-slate-800 rounded transition-transform ease-in-out focus:border-purple-700 sm:focus:scale-110"
              type='text'
              name='username'
              value={userInfo.name}
              onChange={({ target }) => setUserInfo({ ...userInfo, name: target.value })}
            ></input>
            <div className="p-2"></div>

            <label className="text-sl text-gray-400 pb-2">Password</label>
            <input
              className="py-2 px-4 focus:outline-none glassmorph-dark text-white border border-slate-800 rounded transition-transform ease-in-out focus:border-purple-700 sm:focus:scale-110"
              type='password'
              name='password'
              value={userInfo.password}
              onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
            ></input>
            <div className="p-2"></div>

            <div className="p-4"></div>
            <input type="submit" value='Sign in'
              className="hover:shadow-md text-2xl text-white rounded-xl shadow-md py-3 px-6 transition-all duration-200 drop-shadow-2xl font-bold rounded-3xl bg-gradient-to-r from-violet-800 to-fuchsia-800
                duration-300 transition-all ease-in-out hover:from-violet-700 hover:to-fuchsia-700 hover:scale-105">

            </input>
          </form>
        </div>
      </motion.div>

    </AnimatePresence >
  );
};

export default Login;
