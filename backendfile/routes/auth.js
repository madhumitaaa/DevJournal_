const express=require('express')
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post("/register",async(req,res)=>{
     console.log("Incoming request body:", req.body);
    const{name,email,password}=req.body;
    try{
        const existing=await User.findOne({email}).select("+password");;
        if (existing)return res.status(400).json({message:"email already exists"});
        const hashed=await bcrypt.hash(password,10);
        const user=new User({name,email,password:hashed});
        await user.save();
        res.status(201).json({message:"user registered"});
       }
    catch(err){
          console.error("Registration Error:", err.message);
        res.status(500).json({message:"err in registration"});
    }
});
router.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try{
            const user=await User.findOne({email});
            if(!user)return res.status(400).json({message:"invalid credentials"});

            const ismatch=await bcrypt.compare(password,user.password);
             if(!ismatch)return res.status(400).json({message:"invalid credentials"});
             const token =jwt.sign({id:user._id},process.env.JWT_SECRET);
             res.json({token});
}
    catch(err){
          console.error("login Error:", err.message);
                res.status(500).json({message:"err in login"});
    }
});
module.exports=router;