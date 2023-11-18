import mongoose from "mongoose";
const leavedata= mongoose.Schema
let leaveinfomation= new leavedata({
    names:{
        type:String,
        required:false
    },
    pinno:{
        type:String,
        required:false
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
    ,  from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    mail:{
type:String,
required:true
    },
    subject:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true

    },
    status:{
        type:String,
        required:false
    }
})
export default mongoose.model('leavedat',leaveinfomation)