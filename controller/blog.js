// بسم الله الرحمن الرحيم
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");
blogsRouter.get("/", async (_, response) => {
   try {
      const blogs = await Blog.find({});
      if (blogs) return response.json(blogs);
      else
         return response
            .status(404)
            .json({ message: "No blogs found" });
   } catch (error) {
      return response.status(500).json({ message: error.message });
   }
});

blogsRouter.post("/", async (request, response) => {
   const blog = new Blog(request.body);
   if (blog.title === undefined || blog.url === undefined)
      return response
         .status(400)
         .json({ message: "title and url are required" });

   if (!blog["likes"] || blog["likes"] == "")
      blog["likes"] = Number(0);
   try {
      const res = await blog.save();
      if (res) return response.status(201).json(res);
   } catch (error) {
      return response.status(500).json({ message: error.message });
   }
});
blogsRouter.delete("/:id", async (request, response) => {
   const id = request.params.id;
   try {
      const res = await Blog.findByIdAndDelete(id);
      if (res) return response.status(204).json(id);
      else
         return response
            .status(404)
            .json({ message: "No blog found" });
   } catch (error) {
      return response.status(500).json({ message: error.message });
   }
});
module.exports = blogsRouter;
