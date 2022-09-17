import type { NextPage } from "next";
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Form, Button, Input } from "../components/form"

const Login: NextPage = () => {
  const session = useSession()
  // if (session) {
  //   return <>
  //     Signed in as {session.user.email} <br />
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }
  return (
    <>
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
          handleClick={() => signIn()}
          text="Sign in"
          otherText="Don't have an account yet?"
          otherLink="/register"
          otherLinkText="Sign up"
        />

      </Form>
    </>
  );
};

export default Login;

