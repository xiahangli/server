var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        bundle: [path.resolve(__dirname, './app/main.js')]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: "js/[name].[chunkhash:5].js",
        publicPath: '/'
    },
    devServer: {
        inline: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            }
        ],
    },
    //热更新(HMR)不能和[chunkhash]同时使用。
    // plugins: [
    //     new webpack.HotModuleReplacementPlugin()
    // ]
};