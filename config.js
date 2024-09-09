const { default: mongoose } = require("mongoose");
const mongo=require("mongoose");
const connect=mongo.connect("mongodb://localhost:27017/Login");
//check database connected or not
connect.then(()=>
{
    console.log("Database connected successfully");
})
.catch(()=>
{
    console.log("Database cannot connected");
});
//creating database schema
 const dbSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
 });
 //collecting database
 const collection=new mongoose.model("students",dbSchema);
 module.exports=collection;

