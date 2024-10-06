const express=require("express");
const jwt=require("jsonwebtoken");
const JWT_SECRET="xdxdxd";
const app=express();
app.use(express.json());
mongoose.connect("mongodb+srv://sachinprogramming62:H3lEBoO8FArmabQs@cluster0.rpgov.mongodb.net/todo-sachin-2");
const {Usermodel,Todomodel}=require("./mongo");

app.post("/signup",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    await Usermodel.create({
          email,
          password,
          name
    })
    res.json({
        msg:"You are logged in"
    })
})

app.post("/signin",async function(req,res){
         const email=req.body.email;
         const password=req.body.password;
         const user=Usermodel.findone({
            email,
            password
         })
         if(user){
            const token=jwt.sign({
                id:user._id.tostring()
            },JWT_SECRET);
            res.json({
                token:token
            })
         }
         else{
            res.status(404).send({msg:"Invalid credentials"});
         }
})

function Auth(req,res,next){
     const token=req.body.token;
     const decodeddata=jwt.verify(token,JWT_SECRET);
     if(decodeddata){
        req.userId=decodeddata.id;
        next();
     }
     else{
        res.status(404).send({msg:"Invalid Credentials"});
     }
}
app.use(Auth);

app.post("/todo",Auth,function(req,res){
        const Userid=req.userId;
        const title=req.body.title;
        Todomodel.create({
            title,
            Userid
        })
        res.json({
            Userid
        })
})

app.get("/todos",function(req,res){
     const Userid=req.Userid;
     const todos=Todomodel.find({
           Userid
     })
     res.json({
        todos
     })
});

app.listen(3000);
