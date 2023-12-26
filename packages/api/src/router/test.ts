/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { helloInput } from "./schema/post";

export const testRouter = createTRPCRouter({
  hello: publicProcedure.input(helloInput).query(async ({ input }) => ({
    greeting: `Hello ${input.text}!`,
  })),

  post: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      // throw new Error("something error");
      return `response:${JSON.stringify(input)}`;
    }),

  fetch: publicProcedure.query(async ({ input }) => {
    const result = await fetch("http://localhost:3000/api/hello");
    const jsonResult = await result.json();
    return {
      greeting: `${jsonResult.message}`,
    };
  }),

  grpc: publicProcedure.query(async ({ ctx, input }) => {
    return "grpc success";
  }),
});
