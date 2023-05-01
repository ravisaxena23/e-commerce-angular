const express =  require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')
const app = express()
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler');
 
// file constants
const apiBaseUrl=process.env.API_BASE_PREFIX

// Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*',cors())
app.use(authJwt)
app.use(errorHandler);
app.get('/',(req,res)=>{
    res.send('app running successfully')
})
app.use("/public/upload", express.static(__dirname + "/public/upload"));


// routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

app.use(`${apiBaseUrl}/categories`, categoriesRoutes);
app.use(`${apiBaseUrl}/products`, productsRoutes);
app.use(`${apiBaseUrl}/users`, usersRoutes);
app.use(`${apiBaseUrl}/orders`, ordersRoutes);



// database connection
mongoose.connect(process.env.MONGO_CONNECTION).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log(err)
})


// server
app.listen(3000,()=>{
    console.log("the server is running at http://localhost:3000")
})