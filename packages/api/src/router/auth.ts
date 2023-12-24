/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { jwt } from "@acme/jwt";

import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { authInput } from "./schema/auth";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(authInput).mutation(({ ctx, input }) => {
    const token = jwt.sign(input, env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return {
      username: input.username,
      accessToken: token,
    };
  }),
  verify: publicProcedure.mutation(({ ctx }) => {
    const token = ctx.headers.get("authorization") ?? "";
    return jwt.verify(token, env.JWT_SECRET);
  }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return "you can see this secret message!";
  }),
});
