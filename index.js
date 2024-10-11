const express=require("express");
const {z}=require("zod");
const bcrypt=require("bcrypt");
const {UserModel,TodoModel}=require("./db");
const jwt=require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const JWT_SECRET="sachinxdxd";
const app=express();
app.use(express.json());
mongoose.connect("");
app.post("/signup",async function(req,res){
    const requirebody=z.object({
        email:z.string().min(4).max(100).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(5).max(99)
    })
    const parseddata=requirebody.parse(req.body);
    const parseddatawithsucces=requirebody.safeParse(req.body);
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    const hashedpassword=bcrypt.hash(password,5);
    if(!parseddatawithsucces){
       res.json({
         msg:"Invalid input",
         error:parseddatawithsucces.error
       })
    try{
    await UserModel.create({
        email:email,
        password:hashedpassword,
        name:name
    })
    }
    catch(e){
        console.log("error occured");
    }
    res.json({
        msg:"You are logged in"
    })
}}) 

app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const user= await UserModel.findOne({
        email:email,
        password:password
    })
    const passwordmatch=bcrypt.compare(password,user.password);
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
