import NextAuth, { type NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
// import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
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
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        // if (!credentials) return null
        // return { id: '2342', name: 'Morded' }

        const user = prisma.user.findFirst({
          where: {
            AND: [
              {
                name: {
                  equals: username,
                },
              },
              {
                password: {
                  equals: password,
                },
              },
            ],
          },
          select: {
            id: true,
            name: true
          },
        })

        console.log(user)
        if (user) {
        return user
        } else {
        return null
        }

      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
