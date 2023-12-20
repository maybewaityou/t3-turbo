# 基于Node JS官方docker基础镜像
FROM node:alpine as builder

# 定义工作目录
WORKDIR /app

RUN npm install -g pnpm --registry=https://registry.npm.taobao.org
# 添加项目依赖
COPY package*.json ./
# 移除 e2e 测试依赖
RUN sed -i '/cypress/d' package.json
# 安装项目依赖
RUN pnpm install --registry=https://registry.npm.taobao.org

# 拷贝整个项目到工作目录
COPY . .

# 打包项目
RUN pnpm build

# Nginx 官方docker基础镜像
FROM nginx:alpine

# 移除nginx默认文件
RUN rm -rf /usr/share/nginx/html/*

# 拷贝构建好的项目至nginx静态文件夹
COPY --from=builder /app/dist /usr/share/nginx/html
# 拷贝配置文件
COPY --from=builder /app/deploy/etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/deploy/etc/nginx/conf.d /etc/nginx/conf.d
# 拷贝 SSL 配置文件
COPY --from=builder /app/deploy/etc/nginx/ssl /etc/nginx/ssl

# 设置时区
ENV TZ=Asia/Shanghai

# 开启传输端口
EXPOSE 80 443

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]
