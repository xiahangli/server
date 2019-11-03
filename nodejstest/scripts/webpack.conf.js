// Webpack 需要一个 webpack.config.js 的配置文件(可以改名字)，它只是一个 CommonJs 模块
const path = require('path');

//对外暴露配置，不能写export.default，这里js没有经过babel转换的
// = 后面写{}对象
//配置是一段nodejs的脚本文件
module.exports = {
    //entry是入口
    // entry: './src/qf.js', //相对路径等价于
    entry:{
        //多个入口
        main: './src/home.js',
        about: './src/about.js'
    },
    //对输出目录进行配置
    output: {
        //__dirname表示当前文件夹的目录
        path: path.resolve(__dirname, 'dist'), //打包文件的输出路径
        //[]为引用,这里[hash:8]代表截断hash长度为8，下面的两个文件hash值是一样的，可以改成chunkHash
        filename: '[name].[chunkHash:8].js' //打包文件名
    }
}