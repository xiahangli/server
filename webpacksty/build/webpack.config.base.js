const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modifyVars = require("../package.json").theme;
const s  = path.resolve(__dirname, "../src")

const filePublicPath = "assets/[name].[ext]";
const vari = {
    context: path.resolve(__dirname, ".."),
    resolve: {
        // mainFiles: ["index","index.web"],
        modules: [
            path.resolve(__dirname, "../src"),
            path.resolve(__dirname, "../node_modules"),
            "node_modules"
        ],
        alias: {
            src: path.resolve(__dirname, "../src"),
            CONTAINERS: "src/containers",
            MODULES: "src/modules",
            COMPONENTS: "src/components",
            STYLES: "src/styles",
            UTILS: "src/utils",
            ASSETS: "src/assets",
            ROUTER: "src/router",
            STORE: "src/store"
        },
        extensions: [
            ".web.js",
            ".js",
            ".jsx",
            ".less",
            ".css",
            ".json",
            ".scss"
        ] //自动解析的扩展
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: ["babel-loader", "eslint-loader"],
                exclude: [/node_modules/, /assets/],
                include: path.resolve(__dirname, "../src")
            },
            {
                test: /\.eot$/, 
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: filePublicPath,
                        }
                    }
                ]
            },
            {
                test: /\.woff$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: filePublicPath
                        }
                    }
                ]
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: filePublicPath
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: filePublicPath,
                            limit: 100,
                            // publicPath:'./'
                        }
                    }
                ]
            },
            {
                test: /\.ico$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: filePublicPath
                        }
                    }

                ]
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: filePublicPath
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            modifyVars: modifyVars,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            //自动加载模块，而不必到处 import 或 require
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: "views/index.tpl.ejs",
            filename: "index.html",
            minify: true,
            inject: true
        })
    ],
    externals: [
        //扩展，import 下属模块的时候不会打包生成Bundle
        {
            jquery: "jQuery",
            $: "jquery",
            jQuery: "jquery"
        },
        require("webpack-require-http") //支持require 线上地址资源
    ]
};
module.exports = vari;
console.log(vari.resolve.alias.ROUTER);
