# OneCafe
OneCafe是基于Node.js和MongoDB开发的问答社区系统。

## 安装和部署
    1. git clone https://github.com/Byronvis/onecafe.git
    2. cd onecafe/
    3. bower install ;  npm install
    4. ./bin/startup
    5. ./bin/server


## Linux/Mac启动和关闭
### 启动
    1. ./bin/startup(启动redis,mongodb数据库)
    2. ./bin/server dev (可选参数dev,作为开发者模式启动,默认以生产模式启动)。

### 关闭
    1. ./bin/shutdown (关闭redis,mongodb数据库)
