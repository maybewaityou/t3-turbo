/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */
import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";
import { eventHandler, toWebRequest } from "h3";

export default eventHandler(async (event) =>
  Auth(toWebRequest(event), {
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      Discord({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
  }),
);
