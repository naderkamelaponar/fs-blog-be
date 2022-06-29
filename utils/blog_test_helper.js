// بسم الله الرحمن الرحيم
const Blog = require("../models/blog");
const initBlogs = [
   {
      title: "Test  Title 1",
      author: "Test Author 1",
      url: "Test Url 1",
      likes: 1,
   },
   {
      title: "Test  xs 2",
      author: "Test Author 2",
      url: "Test Url 2",
      likes: 2,
   },
];
const allBlogs = async () => {
   const blogs = await Blog.find({});
   return blogs;
};
const idNotExist = async () => {
   const newBlog = new Blog(initBlogs[0]);
   await newBlog.save();
   await newBlog.remove();
   return newBlog.id;
};
module.exports = {
   initBlogs,
   idNotExist,
   allBlogs,
};
