// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";

export default {
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnUser = nextUrl.pathname.startsWith("/console");
      if (isOnUser) {
        return isLoggedIn; // Return true if logged in, false otherwise
      }
    },
  },
} satisfies NextAuthConfig;
