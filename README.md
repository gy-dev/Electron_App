# Electron_App

#### 项目介绍
使用nodejs的Electron模块开发桌面应用

#### 软件架构
软件架构说明


#### 安装教程

1. 安装nodejs
2. npm install  //安装依赖模块
3. npm start //启动
4. npm install electron-packager -g //全局安装打包模块
5. npm run-script packager //运行json中打包脚本进行打包为exe

#### 项目开发步骤

1. 安装nodejs
2. npm init -y //生成package.json
3. 修改 package.json 中 "main" 项为 main.js 指定主进程 js
4. 新增 package.json 中 "scripts" 项 "start": "electron ."  ，指定 electron 启动命令
5. npm install electron --save  //开发目录安装 electron 模块
6. 新建 main.js 和 index.html 编写主进程 js 和默认首页文件，后期再修改这2个文件内容为自己需要的即可

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

