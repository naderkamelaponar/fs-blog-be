// بسم الله الرحمن الرحيم
const axios = require("axios");
const testRouter = require("express").Router();
const instance = axios.create({
	baseURL: 'https://o3dqhz0k4c.execute-api.us-west-2.amazonaws.com/',
    timeout:1000,
})

	

    
    testRouter.get("/", async (_, response) => {
        const ip = await instance.get("/")
        .then().catch(err=>{
          return err.request.socket.remoteAddress})
          const info={name:"Nader Kamel",email:"nader.kamel.the.programmer@gmail.com",ip}
       try {
         
	 const res = await instance.post("/test",info)
        res.data.body.replace('"',"")
        const data= res.data
        data.body=data.body.replace(/"/g," ")
        console.log(data)
        response.status(200).json(data);
        
          return 
       } catch (error) {
          return response.status(500).json({ message: error.message });
       }
    });
module.exports = testRouter;