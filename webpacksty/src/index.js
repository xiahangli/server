import BasicRoute from "./Router";

import {
  BrowserRouter as Router,Route,Link
} from 'react-router-dom';
///todo 1
import React from 'react'//创建组件，虚拟dom元素,life cycle
import ReactDOM from 'react-dom'
// import AppRouter from "./AppRouter";
//将创建好的组件和虚拟dom放入页面展示
let str = require('./a.js');
let xhr  = new XMLHttpRequest();
const sayHi = ()=>{
  console.log("hello babel")
}

sayHi()
//http://localhost:8080 webpack-dev-server的服务-》3000
///todo 2 create 虚拟dom元素,,这里html中是没有属性的，第二个参数为null

// var h1 = React.createElement('h1',null,'达达的');
var h1 = React.createElement('h1',{id:'hhh1',title:'this is h`'},'达达的');

var div =React.createElement("div",null,h1);
//todo 3 第二个参数是dom元素而不是selector#app

// ReactDOM.render(
//     <Router/>,
//     '#app',
// };

ReactDOM.render(
  div,document.getElementById("app")
);

//todo 在js语言中，默认不能写html类似的标记，打包会失败，
// 使用babel转换，jsx（符合xml规范的js）语法,本质还是在运行的时候转换成React.createElement的形式


ReactDOM.render(
    <BasicRoute/>,
    document.getElementById('router')
);
//http-proxy,请求还是以/api/user的方式
xhr.open("GET",'/api/user',true);

xhr.onload = function(){
  console.log(xhr.response);
};
xhr.send();//ajax四部曲
console.log(str);
console.log("dafd");
//js引用css
require('./index.css');
require('./index.less')

//这样子是不能直接在浏览器中运行的，可以在node中运行run index.js