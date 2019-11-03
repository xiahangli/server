const path = require("path");
const webpack = require("webpack");
const base = require("./webpack.config.base");
const merge = require("webpack-merge");
module.exports =merge(base, {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        publicPath: "/"
    },
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        contentBase: "./dist",
        disableHostCheck: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            root: "./"
                        }
                    }
                ]
            },
            {
                test: /\.scss|sass$/,
                use: [
                    {
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader", //
                        options: {
                            modules: true, //class局部作用域
                            localIdentName: "[local]--[hash:base64]"
                        }
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(__dirname, "./postcss.config.js")
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            }
        ]

    }
});
