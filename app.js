// بسم الله الرحمن الرحيم
const express = require("express");
const cors = require("cors");
const blogRouters = require("./controllers/blogs_controller");
const userRouters = require("./controllers/users_controller");
const loginRouter = require("./controllers/login_controller");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_,res) => {
	res.status(200).json({"start":{"there's no god but Allah ":"Mohammad is the Messenger of Allah"},"then":"$url/api/blogs"});
});
app.use("/api/blogs",blogRouters);
app.use("/api/login",loginRouter);
app.use("/api/users",userRouters);
app.use("*",(_,res)=>{
	res.status(404).send("ah You're lost");
});
module.exports = app;
