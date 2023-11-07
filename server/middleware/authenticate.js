const jwt = require("jsonwebtoken");
const Users = require("../models/userSchema");
const Token=require("../models/tokenSchema")
const keysecret = process.env.KEY;

const authenticate = (req, res, next) => {
  // //const token = req.cookies.Pheonixweb;
  // console.log("I am in the authentication function")
  // const token=global.Token;

  // console.log(token);

  // //const verifyToken = jwt.verify(token,keysecret);

  const token=Token.findOne({});
  if(token){
    const id=token.id;
    const rootUser =  Users.findOne({_id:id});
    if(!rootUser){ throw new Error("User Not Found") };
  }
  next();
};

module.exports = authenticate;
