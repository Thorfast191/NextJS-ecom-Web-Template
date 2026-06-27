import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // =========================================
    // GOOGLE OAUTH (CUSTOMERS ONLY)
    // =========================================

    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,

      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // =========================================
    // EMAIL + PASSWORD LOGIN
    // =========================================

    Credentials({
      credentials: {
        email: {},

        password: {},
      },

      async authorize(credentials) {
        // =========================
        // VALIDATE INPUT
        // =========================

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // =========================
        // FIND USER
        // =========================

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          return null;
        }

        // =========================
        // PASSWORD REQUIRED
        // =========================

        if (!user.password) {
          return null;
        }

        // =========================
        // VERIFY PASSWORD
        // =========================

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isValid) {
          return null;
        }

        // =========================
        // RETURN SESSION USER
        // =========================

        return {
          id: user.id,

          email: user.email,

          name: user.name,

          role: user.role,
        };
      },
    }),
  ],

  // =========================================
  // SESSION
  // =========================================

  session: {
    strategy: "jwt",
  },

  // =========================================
  // CALLBACKS
  // =========================================

  callbacks: {
    // =========================
    // GOOGLE LOGIN
    // =========================

    async signIn({ user, account }) {
      // GOOGLE USERS

      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email!,
          },
        });

        // CREATE CUSTOMER

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,

              email: user.email!,

              role: "CUSTOMER",
            },
          });
        }
      }

      return true;
    },

    // =========================
    // JWT
    // =========================

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const user = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (!user) {
        return token;
      }

      token.id = user.id;

      token.role = user.role;

      return token;
    },

    // =========================
    // SESSION
    // =========================

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        session.user.role = token.role as string;
      }

      return session;
    },
  },

  // =========================================
  // CUSTOM PAGES
  // =========================================

  pages: {
    signIn: "/login",
  },

  // =========================================
  // SECRET
  // =========================================

  secret: process.env.AUTH_SECRET,
});
