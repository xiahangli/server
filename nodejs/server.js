// 'use strict'
// var path = require("path");

// path.resolve('/foo/bar', './baz');
//通过require将http库包含到程序中
var http = require('http');
//创建新的HTTP服务器
var server = http.createServer();
//通过request事件来响应request请求
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hell World\n');
});
server.listen('8899');
console.log("Http server is listening at port 8899");

// var fs = require("fs");
//
// fs.readFile('input.txt', function (err, data) {
//     if (err) {
//         return console.error(err);
//     }
//     return console.log(data.toString());
// });

var path = require("path");

//将 to 参数解析为绝对路径，给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径
var s = path.resolve('/foo/bar', './baz');
console.log(s);

console.log("程序执行结束!");


// var WebSocketServer = require('ws').Server,
//
//     wss = new WebSocketServer({ port: 8181 });
//
// wss.on('connection', function (ws) {
//
//     console.log('client connected');
//
//     ws.on('message', function (message) {
//
//         console.log(message);
//
//     });
//
// });