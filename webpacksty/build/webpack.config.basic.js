// Webpack 需要一个 webpack.config.js 的配置文件(可以改名字)，它只是一个 CommonJs 模块
const path = require('path');
let path1 = console.log(path.resolve('dist'));
//对外暴露配置，不能写export.default，这里js没有经过babel转换的
// = 后面写{}对象
//配置是一段nodejs的脚本文件
//HtmlWebpackPlugin 是一个类
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    //entry是入口
    entry: './src/index.js', //相对路径等价于
    devServer: {
        port: 3000,
        progress: true,//显示进度
        contentBase: './dist',
        open: true,
    },
    //webpack 4一下不需要mode
    // mode: 'development',
    // entry:{
    //     //多个入口
    //     main1: './src/index.js',
    //     about: './src/about.js'
    // },
    devServer: {
        //配置转发代理端口,解决跨域问题
        proxy: {
            '/api/user': {
                target: 'http://localhost:3000', //
                // rootpathRewriteUrls: {'/api':''}
            }
        }
    }
    ,


    //对输出目录进行配置
    output: {
        //__dirname表示当前文件夹的目录
        path: path.resolve(__dirname, 'dist'), //打包文件的输出路径
        //[]为引用,这里[hash:8]代表截断hash长度为8，下面的两个文件hash值是一样的，可以改成chunkHash
        filename: '[name].js' //打包文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true

            },
            hash: true
        })
    ],
    module: {//必须配置moudle，不然css无法yoga
        rules: [//正则,以css结尾， css-loader加载器
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            //插入到顶部
                            // insert:'top'
                        }
                    },

                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            //插入到顶部
                            // insert:'top'
                        }
                    },

                    'css-loader',
                    'less-loader'
                ]
            }
            ,
            //babel加载器
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }

            }
        ]
    },

    devtool: 'source-map'//运行时还原源码
};