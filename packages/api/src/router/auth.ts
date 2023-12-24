/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { match, toE } from "@acme/extensions";
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

export async function userFromToken(token: string) {
  if (!token) return null;
  const verifyResult = await toE(
    new Promise((resolve, reject) => {
      try {
        const result = jwt.verify(token, env.JWT_SECRET);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    }),
  );
  return match(
    verifyResult,
    (err) => null,
    (data: any) => ({
      user: {
        id: "clpuj9f32000064mwwsgizh6m",
        name: data.username,
        email: "maybewaityou@gmail.com",
        image: "https://avatars.githubusercontent.com/u/8476488?v=4",
      },
      expires: "2099-12-31 23:59:59.000",
    }),
  );
}
