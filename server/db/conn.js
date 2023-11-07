const mongoose=require("mongoose");
require("dotenv").config();
const url=process.env.DATABASE;

mongoose.set("strictQuery",true);
mongoose.connect(url).then(()=>console.log("Database connected")).catch((error)=>console.log(error));

