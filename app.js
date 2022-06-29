// بسم الله الرحمن الرحيم
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const blogRouters = require("./controller/blog");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", () => {
	console.info("there's no god but Allah ");
});
app.use("/api/blogs",blogRouters);
app.use("*",(_,res)=>{
	res.status(404).send("404 not found");
})
module.exports = app;
