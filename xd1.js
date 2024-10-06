const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_SECRET="xdxdxdxdxd";
const app=express();
app.use(express.json());
const {default:mongoose}=require("mongoose");
await mongoose.connect("mongodb+srv://sachinprogramming62:H3lEBoO8FArmabQs@cluster0.rpgov.mongodb.net/todo-sachin-2");
const {Usermodel,Todomodel}=require("./xd");

app.post("/signup",async function(req,res){
     const email=req.body.email;
     const password=req.body.password;
     const userId=req.body.userId
})
