import { PrismaClient } from "@prisma/client";
import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password)
          throw new CredentialsSignin("Missing email or password");
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) throw new CredentialsSignin("User not found");
        if (user.password !== password)
          throw new CredentialsSignin("Password is incorrect");
        return {
          id: user.id,
          role: user.role,
          email: user.email,
          name: user.name,
        };
      },
    }),
    Google({
      profile(profile) {
        return {
          role: profile.role ?? "user",
          email: profile.email,
          name: profile.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
