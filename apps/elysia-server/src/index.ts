/**
 * Created by MeePwn
 * https://github.com/maybewaityou
 *
 * description:
 *
 */

import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { trpc } from '@elysiajs/trpc'
import { Elysia } from 'elysia'

import { createContext } from '~/context'
import { env } from '~/env.mjs'

import { appRouter } from '@acme/api'

new Elysia()
  .use(cors())
  .use(cookie())
  .use(swagger())
  .use(
    trpc(appRouter, {
      endpoint: '/api/trpc',
      createContext,
    }),
  )
  .listen(env.PORT, ({ hostname, port }) => {
    console.log(`🦊 running at http://${hostname}:${port}`)
  })
