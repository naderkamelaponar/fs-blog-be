// بسم الله الرحمن الرحيم
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogRouters = require("./controller/blog");
const testRouter = require('./controller/awstest');
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_,res) => {
	res.status(200).json({"start":{"there's no god but Allah ":"Mohammad is the Messenger of Allah"},"then":"$url/api/blogs"});
});
app.use('/api/test',testRouter);
app.use("/api/blogs",blogRouters);

app.use("*",(_,res)=>{
	res.status(404).send("ah You're lost");
})
module.exports = app;
