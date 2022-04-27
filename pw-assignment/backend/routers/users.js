import express from "express"
import { User } from "../models/index.js"

export const user_router = express.Router()

user_router.post("/register",async(req,res)=>{
    if(!req.body.name || !req.body.contact){
        res.statusCode = 422
        return res.json({data:"Improper data provided"})
    }

    let u = await User.findOne({name:req.body.name,contact:req.body.contact})
    if(u){
        return res.json({data:"User already exists"})
    }

    const user = new User({
        name:req.body.name,
        contact:req.body.contact,
    })

    user.save((err)=>{
        if(err) return res.json({data:"Error"})
        else return res.json({data:true})
    })
})

user_router.post("/login",async(req,res)=>{
    if(!req.body.contact){
        res.statusCode = 422
        return res.json({data:"Improper data provided"})
    }

    let u = await User.findOne({contact:req.body.contact})
    if(u){
        return res.json({data:true,user:u})
    }else{
        return res.json({data:"User not found"})
    }

})