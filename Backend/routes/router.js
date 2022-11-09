const express = require('express');
const router = express.Router()
const users = require("../models/userSchema")

//register user

router.post('/register',async(req,res)=>{
//console.log(req.body) //checking whether we r getting data or not ,here use pstman
const {name,age,email,mobile,work,address,desc} = req.body;
if(!name || !age || !email || !mobile || !work || !address || !desc){
    res.status(400).json("please enter the require field");
}
try {
   const preuser =  await users.findOne({email:email}) //validate pre existing user
console.log(preuser);
if(preuser){
    res.status.json("this user already exist");
}else{
    const adduser = new users({
        name,age,email,mobile,work,address,desc
    });
    await adduser.save();
    res.status(201).json(adduser) //we can also use send inplace of json
    console.log(adduser)
}
} catch (error) {
    res.status(404).json(error)
}
})
//get user data
router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get("/getuser/:id",async(req,res)=>{
    try {
       // console.log(req.params) added to get response through postman for checking purpose only
    const {id} = req.params
    const indvuser = await users.findById({_id:id})
    console.log(indvuser);
    res.status(404).json(indvuser)
    } catch (error) {
        res.status(404).json(error)
    }
})
//update user data
router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true //SO THAT WE CAN GET UPDATED USER
        })
        console.log(updateduser);
        res.status(201).json(updateduser);
    } catch (error) {
        res.status(422).json(error);
    }
})
//delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteduser = await users.findByIdAndDelete({_id:id})
        res.status(201).json(deleteduser);
    } catch (error) {
        res.status(422).json(error);
    }
})
module.exports =router;