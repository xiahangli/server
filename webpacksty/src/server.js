//express
let express = require('express');

let app = express();

//触发回调函数，函数中入参为请求和响应
app.get('/user/api',(req,res)=>{res.json({name:"xiahangliddd"})});

app.listen(3000);
console.log("daf");