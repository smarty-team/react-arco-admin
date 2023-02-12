# lts-gallium refers to v16
# Using this instead of node:16 to avoid dependabot updates
FROM --platform=linux/amd64 node:18-alpine as builder

WORKDIR /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org/
RUN npm i pnpm -g
COPY package.json pnpm-lock.yaml ./
RUN pnpm config set registry https://registry.npm.taobao.org/
RUN pnpm install
# RUN npm ci

COPY . .

ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

RUN pnpm build

# RUN pnpm prune

FROM nginx:latest

ARG APP_ENV=development
ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
# COPY ./dist /usr/src/app/dist
COPY ./nginx/conf.d /etc/nginx/conf.d
EXPOSE 3002

# USER node
# CMD [ "pnpm", "run", "start:prod" ]
# # CMD [ "pnpm", "run", "start" ]
