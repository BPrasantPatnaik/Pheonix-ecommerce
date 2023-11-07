require("dotenv").config();
const express=require("express")
const app=express()
const mongoose=require("mongoose");
const cors=require("cors");
var cookieParser = require('cookie-parser')

const router=require("./routes/Router")
const Products=require("./models/productSchema");
const DefaultData=require("./Defaultdata");

require("./db/conn");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Replace with your front-end's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ['Set-cookie'] // Allow cookies and authentication headers
  }));
app.use(cookieParser())
app.use(function(req, res, next) { // kolpa magkiorika poy de ta kserw
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  next();
});
app.use("/", router);

const port=8005;
app.listen(port,()=>{
    console.log("Your server is runnning on "+port);
})

DefaultData();