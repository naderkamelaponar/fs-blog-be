// بسم  الله الرحمن الرحيم
const mongoose = require("mongoose");
const config = require("../utils/config");
const mongoUrl = config.MONGO_URI;
mongoose.connect(mongoUrl).then (()=>{	
	console.log("connected to db");
});
const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
});
blogSchema.set("toJSON",{
	transform:(document,returnedObject)=>{
		returnedObject.id=returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
	
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports =Blog;