// بسم الله الرحمن الرحيم
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogRouters=require("./controller/blog");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api",()=>{
	console.log("Allah");
});

app.use("/api/blogs",blogRouters);
module.exports=app;