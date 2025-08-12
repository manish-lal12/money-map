import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/lib/db";

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
    async jwt({ token, trigger, session, user }) {
      // runs only when the user is created, not on every session access
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        token.isOnboarded = dbUser?.isOnboarded ?? false;
      }
      if (trigger === "update") {
        if (session?.isOnboarded) {
          token.isOnboarded = session.isOnboarded;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.isOnboarded = token.isOnboarded;
      }
      return session;
    },

    // this callback is called whenever a session is checked, and runs on edge
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isAuthenticated = !!auth?.user;
      const isOnboarded = auth?.user?.isOnboarded ?? false;

      const protectedRoutes = ["/profile", "/onboarding", "/dashboard"];
      const isProtected = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      if (isProtected && !isAuthenticated) {
        return Response.redirect(new URL("/auth/login", nextUrl.origin));
      }

      // enforce onboarding
      if (
        isAuthenticated &&
        !isOnboarded &&
        nextUrl.pathname !== "/onboarding"
      ) {
        return Response.redirect(new URL("/onboarding", nextUrl.origin));
      }

      if (
        isAuthenticated &&
        isOnboarded &&
        nextUrl.pathname === "/onboarding"
      ) {
        return Response.redirect(new URL("/dashboard", nextUrl.origin));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
