const express=require('express');
const router=express.Router();
const Subscriber=require('../models/subscriber.js')

// getting all

router.get('/',async (req,res)=>{
    try{
        const subscribers=await Subscriber.find();
        res.json(subscribers);
    }catch(err){
        res.status(500).json({message:err._message});
    }
})

// getting one

router.get('/:id',getSubscriber,(req,res)=>{
    res.json(res.subscriber);
})
// creating one

router.post('/',async (req,res)=>{
    const subscriber=new Subscriber({
        name:req.body.name,
        subscribedToChannel:req.body.subscribedToChannel
    })
    try {
        const newSub=await subscriber.save();
        res.status(201).json(newSub);
    } catch (err) {
        res.status(400).json({message:err._message});
        console.log(err._message);
    }
})
// updating one

router.patch('/:id',getSubscriber,async (req,res)=>{
    if(req.body.name!=null){
        res.subscriber.name=req.body.name;
    }
    if(req.body.subscribedToChannel!=null){
        res.subscriber.subscribedToChannel=req.body.subscribedToChannel;
    }
    try {
        const updatedSub=await res.subscriber.save();
        res.json(updatedSub);
    } catch (err) {
        res.status(500).json({message:"Updation failed"});
    }
})
// deleting one

router.delete('/:id',getSubscriber,async (req,res)=>{
    const delName=res.subscriber.name;
    try {
        await Subscriber.deleteOne({name:delName});
        res.json({message:"Deleted Subscriber"});
    } catch (err) {
        res.status(500).json({message:err});
    }
})

async function getSubscriber(req,res,next){
    let subscriber;
    try {
        subscriber=await Subscriber.findById(req.params.id);
        if(subscriber==null){
            return res.status(404).json({message:"Cannot find the user!!"});
        }
    } catch (err) {
        return res.status(500).json({message:err._message});
    }
    res.subscriber=subscriber;
    next();
}

module.exports=router;