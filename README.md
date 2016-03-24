# OneCafe

## 介绍   
OneCafe是基于Node.js和MongoDB开发的问答社区系统。

## 安装和部署
    1. wget https://github.com/Byronvis/onecafe.git
    2. cd onecafe/
    3. bower install
    4. sudo npm install
    5. redis-server ./config/redis.conf(数据库配置文件需自行配置)
    6. mongod -f ./config/mongod.conf(数据库配置文件需自行配置)
    7. ./bin/startup dev

## Linux/Mac启动和关闭
### 启动
1. 启动之前必须启动redis,mongodb数据库。
2. 运行./bin/startup dev (可选参数dev,作为开发者模式启动,默认以生产模式启动)。

### 关闭
1. 退出./bin/startup。  
2. 运行./bin/shutdown (关闭redis,mongodb数据库)。
