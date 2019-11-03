const path = require("path");
const webpack = require("webpack");
const client = require("./webpack.config.base.js");
const merge = require("webpack-merge");
const base = require("./webpack.config.base");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(base, {
    entry: "./src/mount.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        publicPath: "/"
    },
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true,
        disableHostCheck: true,
        // host: '192.168.70.123',
        // proxy: {
        // 	'/auth': {
        // 	  target: 'https://evaluation.leke.cn',
        // 	  changeOrigin: true,
        // 	  secure: false, // 接受 运行在 https 上的服务
        // 	}
        // }

    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            // $: 'jquery',
            // jQuery: 'jquery',
            // 'window.jQuery': 'jquery',
            // 'window.Tether': 'tether'
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
            }
        ]
		
    }
});
