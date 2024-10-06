const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const Users=new Schema({
      email:String,
      password:String,
      name:String
})

const Todos=new Schema({
    email:String,
    password:String,
    userId:ObjectId,
})

const Usermodel=mongoose.model("users",Users);
const Todomodel=mongoose.model("todos",Todos);