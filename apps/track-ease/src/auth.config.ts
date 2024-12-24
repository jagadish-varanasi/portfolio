import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import { getUserById } from "./app/data/user";

const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Your email...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password...",
        },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // logic to verify if user exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toString() },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password.toString(),
          user.hashedPassword || ""
        );

        if (!passwordMatch) {
          return null;
        }

        console.log(user, "auth");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user && token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          role: token.role as string,
        };
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      token.role = user.role;

      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export default authConfig;
