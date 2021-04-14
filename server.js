const express = require("express");//引入express
const app = express();//实例化一个express APP

app.get("/",(req,res)=>{

    res.send("Hello World");
}) //设置路由

const port = process.env.port || 5000;//定义端口号

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
}) //监听