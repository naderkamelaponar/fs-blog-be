// بسم الله الرحمن الرحيم
const blogsRouter = require("express").Router();
const Blog = require("../models/blogs_model");
const User = require("../models/users_model");
const authorize = require("./middlewares/authorization");
const blogOwner = async (userId, blogId) => {
	const user = await User.findById({ _id: userId });
	const blog = await Blog.findById({ _id: blogId });
	return !user || !blog || user.id !== blog.user.toString()
		? null
		: user;
};
blogsRouter.get("/", async (_, response) => {
	try {
		const blogs = await Blog.find({}).populate("user", {
			username: 1,
			id: 1,
			name: 1,
		});
		if (blogs) return response.json(blogs);
		else
			return response
				.status(404)
				.json({ message: "No blogs found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});

blogsRouter.post("/", authorize, async (request, response) => {
	const blog = new Blog(request.body);
	if (!blog.user || !blog.title || !blog.url)
		return response
			.status(400)
			.json({ message: "missing blog parameters" });

	if (!blog["likes"] || blog["likes"] == "")
		blog["likes"] = Number(0);
	const user = await User.findById({ _id: blog.user });
	if (!user)
		return response.status(400).json({ message: "user not found" });
	try {
		const res = await blog.save();
		if (res) {
			user.blogs = user.blogs.concat(res._id);
			user.save();
			return response.status(201).json(res);
		}
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});
blogsRouter.get("/:id", async (request, response) => {
	const id = request.params.id;

	try {
		const blogs = await Blog.findById({ _id: id });
		if (blogs) return response.json(blogs);
		else
			return response
				.status(404)
				.json({ message: "No blogs found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});
blogsRouter.delete("/:id", authorize, async (request, response) => {
	const id = request.params.id;

	const user = request.body.user
		? await blogOwner(request.body.user, id)
		: null;
	if (!user)
		return response.status(401).json({ error: "not Authorized" });
	try {
		const res = await Blog.findByIdAndDelete(id);

		if (res) {
			user.blogs.slice(user.blogs.findIndex(id), 1);

			await user.save();

			return response.status(204).json(id);
		} else {
			return response
				.status(404)
				.json({ message: "No blog found" });
		}
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});
blogsRouter.put("/:id", authorize, async (request, response) => {
	const id = request.params.id;
	const blog = request.body;
	const user = request.body.user
		? await blogOwner(request.body.user, id)
		: null;
	if (!user)
		return response.status(401).json({ error: "not Authorized" });

	try {
		const res = await Blog.findByIdAndUpdate(id, blog);
		if (res) {
			const xs = user.blogs.filter((a) => {
				return a == id;
			});
			console.log(xs);
			if (!xs) user.blogs.push(id);
			await user.save();
			return response.status(202).json(res);
		} else
			return response
				.status(404)
				.json({ message: "No blog found" });
	} catch (error) {
		return response.status(500).json({ message: error.message });
	}
});
module.exports = blogsRouter;
