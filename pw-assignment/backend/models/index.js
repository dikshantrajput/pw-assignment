import mongoose from "mongoose";

const poll_schema = new mongoose.Schema({
    title:"string",
    options:[
        {
            body:"string",
            votes:[
                {
                    name : "string"
                }
            ]
        }
    ]
},{timestamps:true})

export const Poll = new mongoose.model("poll",poll_schema)

const user_schema = new mongoose.Schema({
    name:"string",
    contact:"string"
},{timestamps:true})

export const User = new mongoose.model("user",user_schema)
