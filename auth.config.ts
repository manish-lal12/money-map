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
      const isAuthenticated = !!auth?.user;

      const protectedRoutes = ["/home", "/profile", "/dashboard", "/settings"];
      const isProtected = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      if (isProtected && !isAuthenticated) {
        return Response.redirect(new URL("/auth/login", nextUrl.origin));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
