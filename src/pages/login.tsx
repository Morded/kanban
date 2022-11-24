import type { NextPage } from "next";
import React, { FormEventHandler, useState } from "react"
import { signIn } from "next-auth/react"
import { Form, Button, Input } from "../components/form"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

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

  const handlePasswordChange = (value: string) => setUserInfo({ ...userInfo, password: value });
  const handleUsernameChange = (value: string) => setUserInfo({ ...userInfo, name: value });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col pt-20 md:pt-0 justify-start md:justify-center items-center min-h-screen">
        <Form header="Sign in" onSubmit={handleSubmit}>
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

          <Input
            label='Username'
            type='text'
            onChange={handleUsernameChange}
          />

          <Input
            label='Password'
            type='password'
            onChange={handlePasswordChange}
          />

          <div className="p-4"></div>
          <Button
            text="Sign in"
            otherText="Don't have an account yet?"
            otherLink="register"
            otherLinkText="Sign up"
          />
        </Form>
      </motion.div>

    </AnimatePresence >
  );
};

export default Login;
