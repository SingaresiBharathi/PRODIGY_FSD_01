const express=require("express");
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");
const app=express()//creating app
//converting data into json
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//use ejs as view engine
app.set('view engine','ejs');
//static file
app.use(express.static("public"));
//creating root object for root element
app.get('/',(req,res)=>
{
    res.render('login');
});
app.get('/login',(req,res)=>
{
        res.render('login');
});
app.get('/signup',(req,res)=>
    {
        res.render('signup');
    });
//registering user
app.post('/signup',async (req,res)=>
{
    const data={
        name:req.body.username,
        password:req.body.password
    }
    //checking if the user already exist or not
    const userexist=await collection.findOne({name:data.name});
    if(userexist)
    {
        res.send("User already exist.Please enter a valid username");
    }
    else{
    //hasing the password using bcrypt
    const saltrounds=10;//number of salt rounds for bcrypt
    const hashedp=await bcrypt.hash(data.password,saltrounds);
    data.password=hashedp;//replacing hashed password with original one
    const userdata=await collection.insertMany(data);
    res.send("User registered successfully.");
    console.log(userdata);
    }
});
//login user
app.post('/login',async (req,res)=>
{
    try{
        const check=await collection.findOne({name:req.body.username});
        if(!check)
        {
            res.send("user name cannot found");
        }
    //compare the hash password with plain text
    const passwordMatch=await bcrypt.compare(req.body.password,check.password);
    if(passwordMatch)
    {
        res.render("home");
    }
    else{
        res.send("Wrong password");
    }
    }
    catch{
        res.send("Wrong details");
    }
});
const port=4000;
app.listen(port,()=>
{
    console.log(`server running at port ${port}`);
});