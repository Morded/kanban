import NextAuth, { type NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
// import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    jwt(params) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      return params.token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user = prisma.user.findFirstOrThrow({
          where: {
            name: {
              equals: username,
            },
            password: {
              equals: password,
            },
          },
          select: {
            id: true,
            name: true
          },
        })

        if (user) {
          return user
        } else {
          return null
        }

      },
    }),
  ],
};

export default NextAuth(authOptions);
