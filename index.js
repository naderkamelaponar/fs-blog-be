// بسم الله الرحمن الرحيم
const http = require('http')
const app = require('./app')
http.createServer(app)
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})