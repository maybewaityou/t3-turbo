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
RUN turbo prune --scope=@acme/admin-platform --docker

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
  CI=true SKIP_ENV_VALIDATION=true turbo run build --filter=@acme/admin-platform...
EOF

# Nginx 官方docker基础镜像
FROM nginx:alpine

# 移除nginx默认文件
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建好的项目至nginx静态文件夹
COPY --from=builder /app/apps/admin-platform/dist /usr/share/nginx/html
# 拷贝配置文件
COPY --from=builder /app/apps/admin-platform/deploy/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/admin-platform/deploy/etc/nginx/conf.d /etc/nginx/conf.d
# 拷贝 SSL 配置文件
COPY --from=builder /app/apps/admin-platform/deploy/etc/nginx/ssl /etc/nginx/ssl

# 设置时区
ENV TZ=Asia/Shanghai

# 开启传输端口
EXPOSE 80 443

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]
