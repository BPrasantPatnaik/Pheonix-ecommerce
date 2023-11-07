const mongoose=require("mongoose");
const User=require("./userSchema")

const tokenSchema=new mongoose.Schema({
    id:String,
    token:String
});

const Tokens= new mongoose.model("Tokens",tokenSchema);

module.exports = Tokens ;