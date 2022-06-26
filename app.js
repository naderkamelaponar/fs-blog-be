// بسم الله الرحمن الرحيم
//const config = require('./utils/config')
const express = require('express')
const app = express()
const blogRouters=require('./controller/blog')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/api',(req,res)=>{
    console.log("Allah")
})

app.use('/api/blogs',blogRouters)
module.exports=app