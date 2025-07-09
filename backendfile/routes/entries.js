const express=require("express");
const router=express.Router();
const Entry=require("../models/entry");
const auth=require("../middleware/authmiddleware");


//C
router.post("/",auth,async(req,res)=>{
    try{
            const entry=new Entry({...req.body,userId:req.user});
            await entry.save();
            res.status(201).json(entry);
    }catch(err){
        console.error("Error:", err.message);
            res.status(500).json({ message: "Internal server error" });
    }
});

//G
router.get("/",auth,async(req,res)=>{
    try{
        const entries=await Entry.find({userId:req.user});
        res.json(entries);
    }
    catch(err){
            console.error("Error:", err.message);
            res.status(500).json({ message: "Internal server error" });
    }
});

//U
router.put("/:id",auth,async(req,res)=>{
    try{
        const updated=await Entry.findOneAndUpdate({
            _id: req.params.id,userId:req.user},req.body,
            {new:true}
        );
        res.json(updated);}

        catch(err){
            console.error("Error:", err.message);
            res.status(500).json({ message: "Internal server error" });
    }
});

//D
router.delete("/:id",auth,async(req,res)=>{
    try{
        await Entry.findOneAndDelete({
            _id: req.params.id,userId:req.user}
        );
        res.send("entry deleted");
    }

        catch(err){
            console.error("Error:", err.message);
            res.status(500).json({ message: "Internal server error" });
    }
});
module.exports=router;