import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    MQTT_URL: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    MQTT_URL: process.env.MQTT_URL,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
})
