import NextAuth, { type NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
// import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: env.GOOGLE_ID,
    //   clientSecret: env.GOOGLE_SECRET
    // }),
    CredentialsProvider({
      id: "domain-login",
      name: "Account",
      credentials: {
        username: { label: "Username", type: "text " },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        return null
        // if (credentials === undefined) return

        // const user = prisma.user.findFirst({
        //   where: {
        //     name: credentials.username,
        //     password: credentials.password
        //   }
        // })

        // if (user) {
        //   return user
        // } else {
        //   return null
        // }

      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
