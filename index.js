// بسم الله الرحمن الرحيم
const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const axios = require("axios");
const server = http.createServer(app);
const instance = axios.create({
	baseURL: 'https://o3dqhz0k4c.execute-api.us-west-2.amazonaws.com/',
    timeout:1000,
})
const addNew =()=>{
    const request = instance
	console.log(request)
    
}
server.listen(config.PORT, () => {
	let ip=''
	instance.get("/").then().catch(err=>{
		ip=err.request.socket.remoteAddress})
	const info={name:"Nader Kamel",email:"nader.kamel.the.programmer@gmail.com",ip}
	instance.post("/test",info).then(res=>{console.log(res.data)}).catch(err=>{console.log(err)})
	console.info(`Server running on port ${config.PORT}`);
});
