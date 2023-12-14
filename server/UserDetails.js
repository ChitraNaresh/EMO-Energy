const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: String,
    secondname:String,
    gmail:String,
    password: String,
  });

module.exports.User=new mongoose.model("UserDetails",userSchema)

