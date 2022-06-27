// بسم الله الرحمن الرحيم
const mongoose =require("mongoose");
const supertest=require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const initBlogs =[{
	"title":"Test  Title 1",
	"author":"Test Author 1",
	"url":"Test Url 1",
	"likes":1,
},
{
	"title":"Test  Title 2",
	"author":"Test Author 2",
	"url":"Test Url 2",
	"likes":2,
},];
beforeEach(async()=>{
	await Blog.deleteMany({});
	let newBlog = new Blog(initBlogs[0]);
	await newBlog.save();
	newBlog= new Blog(initBlogs[1]);
	await newBlog.save();
});
describe("Blogs Tests",()=>{
    test('blogs are returned as json',async ()=>{
        const res=await api.get("/api/blogs")
        //console.log(res.header['content-type']);
        expect(res.header['content-type']).toContain('application/json');
    })
    test('number of returned blogs is 2 ',async ()=>{
        const res = await api.get("/api/blogs")
        expect(res['_body'].length).toBe(2)
        
    })
    test('check the _id identifier ',async()=>{ 
        const res = await api.get("/api/blogs")
        expect(res['_body'][0].id).toBeDefined()
    })
    test('HTTP POST request to the /api/blogs', async()=>{
        const newBlog = {"title":"xo Title","author":"xo author","url":"xo url ", "likes":1}
        const res= await api.post('/api/blogs').send(newBlog)
        expect(res.status).toBe(201)
    })
    test('blogs lenth to be 3 ',async ()=>{
        const res= await api.get('/api/blogs')
        console.log(res['_body'])
        //expect(res['_body'].length).toBe(3)
    })
})
afterAll(()=>{mongoose.connection.close();});