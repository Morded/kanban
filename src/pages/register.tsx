import type { NextPage } from "next";
import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Form, Button, Input } from "../components/form"

const Register: NextPage = () => {
  const session = useSession()

  const signUp = () => {
    console.log("TEST")
  }

  if (session.data) {
    return <>
      Signed in as {session.data.user!.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }

  return (
    <>
      <Form header="Sign up">
        <Input
          label="Username"
          type="text"
        />
        <Input
          label="Password"
          type="password"
        />
        <Input
          label="Verify Password"
          type="password"
        />

        <div className="p-4"></div>
        <Button
          handleClick={() => signIn()}
          text="Sign up"
          otherText="Already have an account?"
          otherLink="/login"
          otherLinkText="Sign in"
        />

      </Form>
    </>
  );
};

export default Register;

