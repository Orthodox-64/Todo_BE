const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const User=mongoose.Schema({
    email:String,
    password:String,
    name:String
})

const Todo=mongoose.Schema({
        title:String,
        done:Boolean,
        userId:ObjectId
})

const Usermodel=mongoose.model("users",User);
const Todomodel=mongoose.model("todos",Todo);

module.exports({
    Usermodel,
    Todomodel
})