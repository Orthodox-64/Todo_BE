const express=require("express");
const {UserModel,TodoModel}=require("./db");
const jwt=require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const JWT_SECRET="sachinxdxd";
const app=express();
app.use(express.json());
mongoose.connect("mongodb+srv://sachinprogramming62:H3lEBoO8FArmabQs@cluster0.rpgov.mongodb.net/todo-sachin-2");
app.post("/signup",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    await UserModel.create({
        email:email,
        password:password,
        name:name
    })

    res.json({
        msg:"You are logged in"
    })
})

app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user= await UserModel.findOne({
        email:email,
        password:password
    })
    if(user){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.status(404).json({
            msg:"Invalid Credentials"
        })
    }
})

function Auth(req,res,next){
    const token=req.headers.token;
    const decodeddata=jwt.verify(token,JWT_SECRET);

    if(decodeddata){
        req.userId=decodeddata.id; 
        next();
    }
    else{
        res.status(403).json({msg:"Invalid Credentials"})
    }
}

app.use(Auth);
app.post("/todo",function(req,res){
    const userId=req.userId;
    const title=req.body.title;
    TodoModel.create({
        title,
        userId
    })
    res.json({
        userId:userId
    })
})

app.get("/todos",async function(req,res){
    const userId=req.userId;
    const todos=await TodoModel.find({
        userId:userId
    })
    res.json({
       todos
    })
}) 

app.listen(3000);