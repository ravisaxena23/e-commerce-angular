const express =  require('express')
require('dotenv/config')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

const apiBaseUrl=process.env.API_BASE_PREFIX

// Middleware
app.use(express.json())
app.use(morgan('tiny'))

app.get('/',(req,res)=>{
    res.send('app running successfully')
})

mongoose.connect(process.env.MONGO_CONNECTION).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log("the server is running at http://localhost:3000")
})