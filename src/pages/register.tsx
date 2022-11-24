import type { NextPage } from "next";
import React, { FormEventHandler, useRef, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { Form, Button, Input } from "../components/form"
import { trpc } from "../utils/trpc";
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const { data: session } = useSession()
  const registerUser = trpc.useMutation(["user.register"]);
  const [userInfo, setUserInfo] = useState({ name: '', password: '', passwordAgain: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter();
  const getUser = trpc.useQuery(["user.get", { username: userInfo.name || '' }]);

  if (session?.user) {
    router.push('/dashboard');
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setErrorMessage(() => '');
    e.preventDefault();

    const username = userInfo.name;
    const password = userInfo.password;
    const passwordAgain = userInfo.passwordAgain;

    if (!username) { setErrorMessage('Username is required'); return }
    if (!password) { setErrorMessage('Password is required'); return }
    if (!passwordAgain) { setErrorMessage('Verify password is required'); return }

    if (passwordAgain !== password) { setErrorMessage('The verification password must match the given password'); return }

    if (getUser.data) { setErrorMessage('User with that name already exists'); return }

    await registerUser.mutateAsync({
      username: username,
      password: password,
    })
      .then(() => handleSignIn(username, password))
      .catch((error) => {
        setErrorMessage(JSON.parse(error.message)[0].message)
      })
  };

  const handleSignIn = async (username: string, password: string) => {
    await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
      callbackUrl: '/dashboard',
    })
      .then(data => {
        router.push(data?.url || '/dashboard');
      })
  }

  const handleUsernameChange = (value: string) => setUserInfo({ ...userInfo, name: value });
  const handlePasswordChange = (value: string) => setUserInfo({ ...userInfo, password: value });
  const handlePasswordAgainChange = (value: string) => setUserInfo({ ...userInfo, passwordAgain: value });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col pt-20 md:pt-0 justify-start md:justify-center items-center min-h-screen">
        <Form header="Sign up" onSubmit={handleSubmit}>
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
            label="Username"
            type="text"
            onChange={handleUsernameChange}
          />
          <Input
            label="Password"
            type="password"
            onChange={handlePasswordChange}
          />
          <Input
            label="Verify Password"
            type="password"
            onChange={handlePasswordAgainChange}
          />

          <div className="p-4"></div>
          <Button
            text="Sign up"
            otherText="Already have an account?"
            otherLink="login"
            otherLinkText="Sign in"
          />

        </Form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;

