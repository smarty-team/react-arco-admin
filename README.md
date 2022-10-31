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

```
### 生产环境
```bash
# 启动MongoDB
# 需要Docker及 Docker-compose环境
# 后台启动可以加 -d
docker-compose up

# 启动服务端  
# 需要pm2环境
cd packages/server
pm2 start process.yml

# 访问 http://localhost:3000/api/doc#/

```