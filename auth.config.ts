import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
    }),
  ],
  trustHost: true,
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      console.log("auth", auth);
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/home");
      if (isProtected) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
