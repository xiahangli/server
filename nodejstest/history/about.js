//实现依赖关系 运行所有文件 这里是匿名函数，将下面的module对象传入到这里的function函数中，这是个启动函数
(function (modules)
{
    //这里是定义一个缓存
    var installedModules = {};
    // The require function 实现了一个require方法，因为require不能再浏览器红运行，这里用的是webpack_require
    function __webpack_require__(moduleId) {
        // Check if module is in cache 检查模块是否在缓存中
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            //
            exports: {}
        };
        // Execute the module function，在对象中找到这个moduleId（即.src/about.js）对应的名字，即找到.src/about.js对应的执行函数，调用这里的call方法代表执行
        //执行的时候传入当前的module.exports即{}空对象，然后就
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module，requre的返回结果就是module.export
        return module.exports;
    }
    // Load entry module and return exports, 寻找src/目录下的about.js文件，作为入参传入函数，这样就执行上面定义的函数
    return __webpack_require__(__webpack_require__.s = "./src/about.js");//入口模块
})
/*************这里{}中的是module对象**********************************************************/
({
    //key为模块的路径
    "./src/about.js":
        //value为所谓的执行函数
        (function (module, exports) {
            eval("console.log(\"about\");\n\n\n\n//# sourceURL=webpack:///./src/about.js?");
        })
});