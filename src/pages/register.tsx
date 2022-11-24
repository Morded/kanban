import type { NextPage } from "next";
import React, { useRef, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { Form, Button, Input } from "../components/form"
import { trpc } from "../utils/trpc";
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const { data: session } = useSession()
  const registerUser = trpc.useMutation(["user.register"]);
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordAgainRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter();
  const getUser = trpc.useQuery(["user.get", { username: usernameRef?.current?.value || '' }]);

  if (session?.user) {
    router.push('/dashboard');
  }

  const signUp = async (e: any) => {
    setErrorMessage(() => '');
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordAgain = passwordAgainRef.current?.value;

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
  }

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

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col pt-20 md:pt-0 justify-start md:justify-center items-center min-h-screen">
        <Form header="Sign up">
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
            ref={usernameRef}
            label="Username"
            type="text"
          />
          <Input
            ref={passwordRef}
            label="Password"
            type="password"
          />
          <Input
            ref={passwordAgainRef}
            label="Verify Password"
            type="password"
          />

          <div className="p-4"></div>
          <Button
            handleClick={e => signUp(e)}
            text="Sign up"
            otherText="Already have an account?"
            otherLink="/login"
            otherLinkText="Sign in"
          />

        </Form>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;

