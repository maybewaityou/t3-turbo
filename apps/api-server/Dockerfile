ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-alpine AS base
# LABEL fly_launch_runtime="Next.js"
ENV NEXT_TELEMETRY_DISABLED=1
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN <<EOF
  apk add --no-cache libc6-compat openssl1.1-compat bash 
  npm install -g pnpm
EOF

FROM base AS with-turbo
RUN npm install -g turbo

FROM with-turbo AS pruned-repo
WORKDIR /app

COPY . .
RUN turbo prune --scope=@acme/nextjs --scope=@acme/api-server --scope=@acme/db --docker

FROM with-turbo as builder
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=pruned-repo /app/out/json/ .
COPY --from=pruned-repo /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Build the project and its dependencies
COPY --from=pruned-repo /app/out/full/ .
COPY turbo.json turbo.json

## This would be useful for browser environment variables that are actually baked at build time and you aren't passing them in otherwise.
COPY --from=pruned-repo /app/.env .env
RUN <<EOF
  cd packages/db && pnpm run db:generate
  CI=true SKIP_ENV_VALIDATION=true turbo run build --filter=@acme/nextjs... --filter=@acme/api-server... --filter=@acme/db...
EOF

WORKDIR /app/packages/db
RUN pnpm run db:push

FROM oven/bun:1 as runner
WORKDIR /app

ENV NODE_ENV production

# Don't run production as root
RUN <<EOF 
  addgroup --system --gid 1001 nodejs
  adduser --system --uid 1001 fastify
EOF

COPY --from=builder --chown=fastify:nodejs /app/apps/api-server/src ./apps/api-server/src
COPY --from=builder --chown=fastify:nodejs /app/apps/api-server/node_modules ./apps/api-server/node_modules
COPY --from=builder --chown=fastify:nodejs /app/apps/api-server/package.json ./apps/api-server/package.json
COPY --from=builder --chown=fastify:nodejs /app/apps/api-server/tsconfig.json ./apps/api-server/tsconfig.json

COPY --from=builder --chown=fastify:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=fastify:nodejs /app/packages ./packages
COPY --from=builder --chown=fastify:nodejs /app/package.json ./package.json

USER fastify
EXPOSE 8080
ENV PORT 8080
# ENV HOSTNAME localhost

CMD ["bun", "run", "apps/api-server/src/index.ts"]
