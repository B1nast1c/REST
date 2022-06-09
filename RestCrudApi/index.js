const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const tasksRoutes = require('./Rutas/Tasks')

//Prefijo middleware :D
app.use(express.json())
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-auth-token");;
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

app.use('/api', tasksRoutes)
app.use(cors({ origin: true }));

mongoose.connect(process.env.MONGODB_URI2)
.then(()=>{console.log("Connected")})
.catch((error)=>{console.log("Error: ", error)})

app.listen(port, () => {
    console.log("Puerto: ", port)
})