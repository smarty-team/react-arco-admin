# react-arco-admin

## 服务端启动方法

### 开发环境

```bash
# 启动DB
pnpm db:start

# 停止DB
pnpm db:stop

# 启动服务端
pnpm dev:server

# 访问 http://localhost:3000/api/doc#/


# 启动admin
pnpm dev:admin

# 启动cms Nest SSR
pnpm dev:cms

# 启动后台管理
docker compose up redis mongo server admin --force-recreate --build


# 强制重新创建容器
docker compose up --force-recreate --build

```

### 生产环境

```bash
# 启动MongoDB
# 需要Docker及 Docker-compose环境
# 后台启动可以加 -d
docker-compose up

# 编译程序
pnpm build

# 启动服务端
# 需要pm2环境
cd packages/server
pm2 start process.yml

# 访问 http://localhost:3000/api/doc#/


```
