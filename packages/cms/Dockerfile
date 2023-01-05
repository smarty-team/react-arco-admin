# lts-gallium refers to v16
# Using this instead of node:16 to avoid dependabot updates
FROM node:18.12.1-buster-slim as builder

WORKDIR /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org/
RUN npm i pnpm -g
COPY package.json pnpm-lock.yaml ./
RUN pnpm config set registry https://registry.npm.taobao.org/
# RUN pnpm install
# 产生扁平目录
RUN pnpm install --shamefully-hoist 

COPY . .

EXPOSE 3001

USER node
CMD [ "pnpm", "run", "start:prod" ]
