import mongoose from "mongoose";
const newact=mongoose.Schema
let active=new newact({
    day:{
        type:String,
        required:true
    }
})
export default mongoose.model('actrepo',active)