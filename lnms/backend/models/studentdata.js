import mongoose from "mongoose";
const formu=mongoose.Schema;
let informous=new formu({
   name:{
    type:String,
    required:true
   },
 
   pin:{
      type:String,
      required:true
   },
   branch:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
     },
     mail:{
      type:String,
      required:true
     }
})
export default mongoose.model('formo',informous)