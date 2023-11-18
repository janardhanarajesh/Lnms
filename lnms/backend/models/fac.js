import mongoose from "mongoose";
const faclot=mongoose.Schema
let facualty=new faclot({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
export default mongoose.model('facualtylog',facualty)