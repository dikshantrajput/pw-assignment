import express from "express";
import mongoose from "mongoose";
import { Poll } from "../models/index.js";

export const polls_router = express.Router()

polls_router.get('/all',async (_,res)=>{
    let c = await Poll.count()
    if(c === 0){
        Poll.insertMany([
            {
                title:"Who will win today?",
                options:[
                    {
                        body:"MI",
                        votes:[
                            
                        ]
                    },
                    {
                        body:"CSK",
                        votes:[
                            
                        ]
                    }
                ]
            },
            {
                title:"Which is the best blockchain?",
                options:[
                    {
                        body:"Polygon",
                        votes:[
                            
                        ]
                    },
                    {
                        body:"Ethereum",
                        votes:[
                            
                        ]
                    },
                    {
                        body:"Solana",
                        votes:[
                            
                        ]
                    }
                ]
            }
        ])
    }
    const polls = await Poll.find({})
    res.json({data:polls})
})

polls_router.post('/vote',async (req,res)=>{
    const name = req.body.name
    const id = req.body.id
    const poll_id = req.body.poll_id
    let poll = await Poll.findOne({"options._id":id})
    let f = false
    poll.options.forEach(op=>{
        if(op.votes.some((a)=>a.name === name)){
            f = true
            return res.json({data:"Already voted"})
        }else{
            return
        }
    })
    if(!f){
        let index = poll.options.findIndex((o)=>o._id.toString() === id)
        poll.options[index].votes.push({name:name})
    
        poll.save((err)=>{
            if(err) return res.json({data:"Error"})
            else return res.json({data:true})
        })
    }
})

polls_router.get('/data/:poll_id',async (req,res)=>{
    const poll_id = req.params.poll_id
    let poll = await Poll.findOne({_id:poll_id})
    let data = []
    poll.options.forEach((option)=>{
        data.push({id:option._id.toString(),count:option.votes.length}) 
    })

    let total_count = data.reduce((prev,curr)=>prev+curr.count,0)

    let d = data.map((o)=>{
        return {id:o.id,per:(o.count/total_count) * 100}
    })

    return res.json({data:d})
})