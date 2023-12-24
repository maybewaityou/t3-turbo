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
