// بسم الله الرحمن الرحيم
const blogsRouter = require("express").Router();
const Blog =require("../models/blog");
require("express-async-errors");
blogsRouter.get("/", async(_, response) => {
	try {
		const blogs = await Blog.find({});
		if (blogs) return (response.json(blogs));
		else return (response.status(404).json({ message: "No blogs found" }));
	} catch (error) {
		return (response.status(500).json({ message: error.message }));
	}

	
	
});
  
blogsRouter.post("/", async(request, response) => {
	const blog = new Blog(request.body);
	const res = await  blog.save();
	if (res) return response.status(201).json(res);
	
		
});
module.exports=blogsRouter;