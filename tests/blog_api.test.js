// بسم الله الرحمن الرحيم
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const blogHelper = require("../utils/blog_test_helper");
beforeAll(async () => {
   await Blog.deleteMany({});
   const blogObjects = blogHelper.initBlogs.map(
      (blog) => new Blog(blog)
   );
   const promiseObjects = blogObjects.map((blog) => blog.save());
   await Promise.all(promiseObjects);
});

describe(" Verify that the blog list application ", () => {
   test("returns the correct amount of blog posts in the JSON format.", async () => {
      const res = await api.get("/api/blogs");
      expect(res.header["content-type"]).toContain(
         "application/json"
      );
   });
   test(" the unique identifier property of the blog posts is named id ", async () => {
      const res = await api.get("/api/blogs");
      expect(res["_body"][0].id).toBeDefined();
   });
   describe("making an HTTP POST request to the /api/blogs url ", () => {
      test("successfully creates a new blog post.", async () => {
         const newBlog = {
            title: "nb  Title 1",
            author: "nb Author 1",
            url: "nb Url 1",
            likes: 1,
         };
         await api.post("/api/blogs").send(newBlog).expect(201);
      });
      test("total number of blogs in the system is increased by one.  ", async () => {
         const res = await api.get("/api/blogs");
         expect(res["_body"].length).toBe(
            blogHelper.initBlogs.length + 1
         );
      });
      let id2Delete = "";
      describe("if the likes property is missing from the request, ", () => {
         test("it will default to the value 0", async () => {
            const newBlog = blogHelper.initBlogs[0];
            newBlog["likes"] = "";
            const res = await api.post("/api/blogs").send(newBlog);
            expect(res["_body"]["likes"]).toBe(0);
            id2Delete = res["_body"].id;
         });
      });
      describe("if the title and url properties are missing from the request data", () => {
         test("the backend responds to the request with the status code 400 Bad Request.", async () => {
            const newBlog = new Blog({ likes: "", author: "author" });
            await api.post("/api/blogs").send(newBlog).expect(400);
         });
      });
      describe("handling a specifc blog id ", () => {
         test("delete request should return 204 if id exist", async () => {
            await api.delete(`/api/blogs/${id2Delete}`).expect(204);
         });
         test("delete request should return 404 if id NOT exist", async () => {
            await api.delete(`/api/blogs/${id2Delete}`).expect(404);
         });
      });
      test("blogs length to be 3 ", async () => {
         const res = await api.get("/api/blogs");
         expect(res["_body"].length).toBe(3);
      });
   });
});
afterAll(() => {
   mongoose.connection.close();
});
