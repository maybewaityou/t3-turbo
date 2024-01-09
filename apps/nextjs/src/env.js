import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    HOST: z.string(),
    PORT: z.string(),
    USE_SERVER: z.string(),
    SERVER_HOST: z.string(),
    SERVER_PORT: z.string(),
    DATABASE_URL: z.string(),
    REDIS_KEY_PREFIX: z.string(),
    REDIS_URL: z.string(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    // MQTT
    NEXT_PUBLIC_WS_MQTT_URL: z.string(),
    NEXT_PUBLIC_WS_MQTT_USERNAME: z.string(),
    NEXT_PUBLIC_WS_MQTT_PASSWORD: z.string(),
    NEXT_PUBLIC_WS_MQTT_CLIENT_ID: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    VERCEL_URL: process.env.VERCEL_URL,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    USE_SERVER: process.env.USE_SERVER,
    SERVER_HOST: process.env.SERVER_HOST,
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_KEY_PREFIX: process.env.REDIS_KEY_PREFIX,
    REDIS_URL: process.env.REDIS_URL,
    // MQTT
    NEXT_PUBLIC_WS_MQTT_URL: process.env.NEXT_PUBLIC_WS_MQTT_URL,
    NEXT_PUBLIC_WS_MQTT_USERNAME: process.env.NEXT_PUBLIC_WS_MQTT_USERNAME,
    NEXT_PUBLIC_WS_MQTT_PASSWORD: process.env.NEXT_PUBLIC_WS_MQTT_PASSWORD,
    NEXT_PUBLIC_WS_MQTT_CLIENT_ID: process.env.NEXT_PUBLIC_WS_MQTT_CLIENT_ID,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
