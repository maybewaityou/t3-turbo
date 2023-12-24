/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { z } from "zod";

export const authInput = z.object({
  username: z.string(),
  password: z.string(),
});

export const verifyInput = z.object({ token: z.string() });
