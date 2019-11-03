const postcssConfig = {
    plugins: [
        require("autoprefixer")
    ]
};
if (process.env.FILE_TYPE === 'm' || process.env.FILE_TYPE === 'hd'){
    //移动端 px转rem
    postcssConfig.plugins.push(require("postcss-pxtorem")({
        rootValue: 100,
        unitPrecision: 5,
        propList: ["*"],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 2
    }));
}
module.exports = postcssConfig;
