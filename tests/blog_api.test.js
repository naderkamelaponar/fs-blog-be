// بسم الله الرحمن الرحيم
const mongoose =require("mongoose");
const supertest=require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const blogHelper = require("../utils/blog_test_helper");
beforeAll(async()=>{
	await Blog.deleteMany({});
	const blogObjects= blogHelper.initBlogs.map(blog => new Blog(blog));
	const promiseObjects= blogObjects.map(blog=>blog.save());
	await Promise.all(promiseObjects);
  
});
describe("Blogs Tests",()=>{
	test("blogs are returned as json",async ()=>{
		const res=await api.get("/api/blogs");
		expect(res.header["content-type"]).toContain("application/json");
	});
	test("number of returned blogs is 2 ",async ()=>{
		const res = await api.get("/api/blogs");
		expect(res["_body"].length).toBe(2);
        
	});
	test("check the _id identifier ",async()=>{ 
		const res = await api.get("/api/blogs");
		expect(res["_body"][0].id).toBeDefined();
	});
	test("HTTP POST request to the /api/blogs", async ()=>{
		const newBlog = {
			"title":"nb  Title 1",
			"author":"nb Author 1",
			"url":"nb Url 1",
			"likes":1,
		};
		await api.post("/api/blogs").send(newBlog)
			.expect(201);
       
	});
    
	test("blogs length to be 3 ",async ()=>{
        
		const res=  await api.get("/api/blogs");
		expect(res["_body"].length).toBe(3);
	});
});
afterAll(()=>{mongoose.connection.close();});