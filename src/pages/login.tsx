import type { NextPage } from "next";
import React, { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Form, Button, Input } from "../components/form"

const Login: NextPage = () => {
  const session = useSession()
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') {
      setAuthenticated(true);
    }
  }, [])

  if (authenticated === true) {
    return <>
      Signed in as {authenticated}<br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return (
    <div className="flex flex-col pt-20 px-10 md:px-0 md:-pt-0 justify-start md:justify-center items-center min-h-screen">
      <Form header="Sign in">
        <Input
          label="Username"
          type="text"
        />
        <Input
          label="Password"
          type="password"
        />

        <div className="p-4"></div>
        <Button
          handleClick={() => signIn('credentials', { redirect: true, password:  })}
          text="Sign in"
          otherText="Don't have an account yet?"
          otherLink="/register"
          otherLinkText="Sign up"
        />

      </Form>
    </div>
  );
};

export default Login;

