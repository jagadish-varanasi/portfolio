import NextAuth, { DefaultSession } from "next-auth";

declare module "@auth/core/jwt" {
  interface JWT {
    role: string;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's role. */
      role: string;
    } & DefaultSession["user"];
  }
}
