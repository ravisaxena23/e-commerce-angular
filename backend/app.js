const express =  require('express')

const app = express()


app.get('/',(req,res)=>{
    res.send('app running successfully')
})
app.listen(3000,()=>{
    console.log("the server is running at http://localhost:3000")
})