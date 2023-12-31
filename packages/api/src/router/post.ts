/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createPostInput, deletePostInput, postByIdInput } from "./schema/post";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({ orderBy: { id: "desc" } });
  }),

  byId: publicProcedure.input(postByIdInput).query(({ ctx, input }) => {
    return ctx.db.post.findFirst({ where: { id: input.id } });
  }),

  create: protectedProcedure
    .input(createPostInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.kv.setObj("post", input);
      return ctx.db.post.create({ data: input });
    }),

  delete: protectedProcedure
    .input(deletePostInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.post.delete({ where: { id: input } });
    }),
});
