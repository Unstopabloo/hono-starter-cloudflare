import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(drizzle, {
    provider: "sqlite",
    usePlural: true
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  plugins: [
    admin()
  ],
})