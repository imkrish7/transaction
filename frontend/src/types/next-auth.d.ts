import { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    role: string;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    role: string;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
