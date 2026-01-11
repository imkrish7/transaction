import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "@/types/auth.type";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BACKEND_URI}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const data = (await res.json()) as LoginResponse;

        if (res.ok && data) {
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            image: data.user.image,
            role: data.user.role,
            accessToken: data.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub!;
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;

      return {
        ...session,
        accessToken: token.accessToken as string,
        user: {
          ...session.user,
          id: token.sub!,
          role: token.role as string,
        },
      };
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
export const { auth, handlers, signIn, signOut } = handler;
