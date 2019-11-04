const path = require("path");
const webpack = require("webpack");
// const envFile = require('node-env-file');
const base = require("./webpack.config.base");
const merge = require("webpack-merge");
const WebpackMd5Hash = require("webpack-md5-hash");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//webpack bundle分析

// const manifest = require("./dllJson/reactVendor-manifest.json");

module.exports = function(env){
    console.log(env);
    const WEBPACK_ENV = env && env.ENV ? env.ENV : false;
    const NOT_RELEASE = process.env.NOT_RELEASE || !!WEBPACK_ENV;
    const IS_LOCAL = process.env.IS_LOCAL;
    let plugins = [
        new WebpackMd5Hash(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "styles/[name].[chunkhash].css"
        })
    ];
    if (NOT_RELEASE){
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js']
        }));
    }
    if (IS_LOCAL){
        plugins.push(new BundleAnalyzerPlugin());
    }
    return  {
        mode: "production",
        entry: {
            bundle: [path.resolve(__dirname, "./src/mount.js")]
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "js/[name].[chunkhash].js",
            chunkFilename: "js/[name].[chunkhash:5].js",
            publicPath: "./"
        },
        // optimization: {
        //     splitChunks: {
        //         cacheGroups: {
        //             vendor: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 name: "vendors",
        //                 priority: -20,
        //                 chunks: "all"
        //             }
        //         }
        //     },
        //     minimizer: [
        //         new UglifyJsPlugin({
        //             uglifyOptions: {
        //                 compress: {
        //                     drop_console: !NOT_RELEASE, //去除console.log(只有生产环境需要去除)
        //                 }
        //             },
        //             sourceMap: !!NOT_RELEASE //除了relese环境其他的都保留source-map (boolean)
        //         }),
        //         new OptimizeCSSAssetsPlugin({})
        //     ]
        // },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // by default it use publicPath in webpackOptions.output
                                publicPath: "./"
                            }
                        },
                        {
                            loader: "css-loader"
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
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: "./"
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                modules: true, //class局部作用域
                                localIdentName: '[local]--[hash:base64]'
                            }
                        },
                        {
                            loader: "sass-loader"
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
                //todo babel打包react需要这个
                {
                    test: /\.js?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                }
            ]
        }
    };
};
