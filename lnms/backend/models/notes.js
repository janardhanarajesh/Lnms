import mongoose from "mongoose";
let note=mongoose.Schema
let newnote=new note({
    disc:{
    type:String,
    required:true
},
pinno:{
    type:String,
    required:true
},
profil:{
    type:String,
    required:true
},
tim:{
    type:String,
    required:true
}
})
export default mongoose.model('notice',newnote)