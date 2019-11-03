// const path = require('path')
// //html-webpack-plugin的用途
// //
// // 对于打包的文件名中有hash的，这个插件是必选，因为每次源文件修改，打包后的名字就不一样
// // 生成一个html5模板文件，可适用于lodash模板，也可以利用自己定义的加载器
// // js注入，打包后的js文件会自动注入到html文件的body结尾部分(默认，也可以注入到head部分)
// // css文件注入,假如你使用ExtractTextPlugin插件(这个插件也是必须要了解的)将css文件是单独剥离出来，不放在html中的style标签内，它会自动将css链接注入到link标签中
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //第二步导入
// // 输出为一个对象
// module.exports = {
//     entry: './src/main', //main.js中的.js可以省略，前面的./不能省
//     output:{
//         filename:'./dist/app.js' ,// dist文件夹不存在时，会自动创建
//         hashDigestLength: 8 // 默认长度是20
//     },
//     plugins: [new HtmlWebpackPlugin], //第三步，实例化后放在plugins这个数组中就行
//     devServer: {
//         contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
//         port: 9000, //端口改为9000
//         open:true, // 自动打开浏览器，适合懒人
//         index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
//         inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
//         hot:false,
//         compress:true //压缩
//     }
// }