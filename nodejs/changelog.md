# 2019-01-29
### 1、README文件修改(新增corss-env FILE_TYPE说明)
### 2、.bablerc加入antd&antd-mobile配置

# 2019-01-28
### 1、README文件修改(新增规范CI/CD说明)
### 2、webpack.config.production.js修改:module.exports ={...}改为module.exports =function(env){...}
### 3、打包命令调整:npm/yarn run build -- --env.ENV=pre(非release分支全部由此命令打包，保留log和source-map)

# 2019-01-14
### 1、antd修改版本至3.8.2
### 2、source-map配置优化
### 3、cross-env(跨平台环境变量设置)加入(package.json中有案例)

# 2019-01-04 加入webpack-bundle-analyzer能够分析项目每个模块插件依赖的体积大小

# 2018-10-25 redux加入，加入redux-devtools-extension chrome扩展(https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

# 2018-09-07 基础路由加入
