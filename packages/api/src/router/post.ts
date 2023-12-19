/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure.query(({ input }) => {
    return {
      greeting: `Hello ${input}`,
    };
  }),
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({ orderBy: { id: "desc" } });
  }),

  byId: publicProcedure.query(({ ctx, input }: any) => {
    return ctx.db.post.findFirst({ where: { id: input.id } });
  }),

  create: protectedProcedure.mutation(async ({ ctx, input }: any) => {
    await ctx.kv.setObj("post", input);
    return ctx.db.post.create({ data: input });
  }),

  delete: protectedProcedure.mutation(({ ctx, input }: any) => {
    return ctx.db.post.delete({ where: { id: input } });
  }),
});
