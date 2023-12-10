/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { z } from "zod";

export const helloInput = z.object({ text: z.string() });

export const postByIdInput = z.object({ id: z.string() });

export const createPostInput = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const deletePostInput = z.string();
