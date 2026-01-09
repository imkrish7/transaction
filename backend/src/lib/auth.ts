import { betterAuth } from "better-auth";
import { openAPI, jwt, bearer, organization } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.ts";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  url: process.env.BETTER_AUTH_URL!,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI(),
    jwt(),
    bearer(),
    organization({
      teams: {
        enabled: true,
        allowRemovingAllTeams: false,
      },
    }),
  ],
});
