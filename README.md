# react-arco-admin

## 服务端启动方法

### 开发环境

```bash
# 启动MongoDB
# 需要Docker及 Docker-compose环境
# 后台启动可以加 -d
docker-compose up

# 启动服务端
cd packages/server
pnpm dev

# 访问 http://localhost:3000/api/doc#/

# 启动DB
docker compose up redis mongo

# 启动服务器端
docker compose up redis mongo server --force-recreate --build

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
