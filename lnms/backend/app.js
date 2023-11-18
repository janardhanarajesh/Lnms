import express  from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import formo from "./models/studentdata"
import multer from "multer"
import leavedat from "./models/leavedata"
import nodemailer from 'nodemailer'
import facualtylog from "./models/fac"
import notice from "./models/notes"
import fac from "./models/fac"
const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
mongoose.connect("mongodb+srv://janardhanarajesh2:Rajesh-1596@database1.zqbz4vx.mongodb.net/database1?retryWrites=true&w=majority")
.then(()=>app.listen(5001))
.then(()=>console.log('connected to data base & listning to 5001'))
app.use('/test',(req,res,next)=>
{
    res.send('working properly')
})


app.post("/student",(req,res,next)=>{
    const{name,password,pin,branch,mail}=req.body.studenti;
    const frol=new formo({
        name,
        password,
        pin,
        branch,
        mail
    })
    try{
        
       
        frol.save();
    return res.status(200).json({msg:'Registered'})

        

            
    
        }
    catch(err)
    {
        console.log('err')

    }
    
    }
    )
    app.get('/getstud/:name/:password', async (req, res, next) => {
        const _name = req.params.name;
        const _password = req.params.password;
    
        try {
            let studentlog = await formo.find({ name: _name, password: _password })
         
            if (studentlog.length === 0) {
                return res.status(240).json({ msg:'notfound' });
            }
            let stulo=studentlog[0].name
            let stuname=studentlog[0].pin
            let stubranch=studentlog[0].branch
            let stumail=studentlog[0].mail
            let stupass=studentlog[0].password

            return res.status(200).json({stulo,stuname,stubranch,stumail,stupass});
        } catch (err) {
            console.error(err);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    });
    
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, 'public/images')
        },
        filename: function (req, file, callback) {
          callback(null,file.originalname)
        }
      })
      const upload = multer({ storage: storage })
    app.put('/putstuddata',upload.single("file"),(req,res,next)=>
    {
 const profile= (req.file) ? req.file.originalname : null

        const{names,pinno,branch,year,section,from,to,subject,mail}=req.body
        let day= new Date()
        let status="not responded"
                const leave=new leavedat({
            names,
            pinno,
            year,
            branch,
            section,
            mail,
            from,
            to,
            day,
            subject,
         profile,
         status
        })
        try{
            leave.save()
            return res.status(201).json({ msg: 'submited' });
        }
        catch(err)
        {
            console.log('not inserted')
        }
    })
    app.use(express.static('public'))
app.get('/getimage',async(req,res,next)=>{
    let imagedata
    try{
        imagedata=await leavedat.find()
    }
    catch(err)
    {
        console.log(err)

    }
    if(!imagedata)
    {
        console.log('user not found');
    }
    
    return res.status(200).json({imagedata})
})
app.get('/sendmail/:x/:vl',async(req,res,next)=>
{
    let studleave=req.params.x
    let fac=req.params.vl
    // let act=req.params.y
  

    let mailer
    let mailex
    let namer
    let _name
    let _from
    let fro
    let _to
    let t
    let _sub
    let _s
    // const projection = { name:0, _id: 0,mail:1 };
    try{
        mailer=await leavedat.find({_id:studleave})
       mailex=mailer[0].mail
       _name=mailer[0].names
       _from=mailer[0].from
       _to=mailer[0].to
       _sub=mailer[0].subject       //    console.log(mailex)
       _s=mailer[0].day
    // var nodemailer=require('nodemailer')
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kjanrdhanarajesh@gmail.com',
          pass: 'fodp xgox szzk difp'
        }
      });
      
      var mailOptions = {
        from: 'kjanrdhanarajesh@gmail.com',
        to: mailex,
        subject: 'leave permission',
        html:"Mrs/Mr"+" "+_name+" "+"you have requested for leave due to"+" "+_sub+" "+"from"+" "+_from+" "+"to"+" "+_to+" "+"is granted by"+" " +fac+". "+"which is requested on "+" "+_s+"."
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
        //   console.log('Email sent: ' + info.response);
          return res.status(242).json({msg:'mail sent'})
        }
          });
          
      }
      catch(err)
    {
        return res.status(200).json({msg:'error'})
        // console.log(err)
    }
  })

app.put('/poststatus/:x',async(req,res,next)=>
{
  let id=req.params.x
  let status="granted"
  try{
    let upddata=await leavedat.findByIdAndUpdate(id,{
      status
    })
    return res.status(243).json({upddata})
  }
catch(err)
{
  console.log('err')
}
})
app.put('/poststatus1/:xy',async(req,res,next)=>
{
  let id=req.params.xy
  let status="rejected"
  try{
    let upddat=await leavedat.findByIdAndUpdate(id,{
      status
    })
    return res.status(242).json({upddat})
  }
catch(err)
{
  console.log('err')
}
})
app.get('/faclog/:name/:password', async (req, res, next) => {
    const _name = req.params.name;
    const _password = req.params.password;

    try {
        let faclog = await facualtylog.find({ name: _name, password: _password });

        if (faclog.length === 0) {
            return res.status(241).json({ msg: 'notfound' });
        }

  let facl=faclog[0].name

    //   
        return res.status(245).json({msg:'loggedin',facl});

    } 
    catch (err) { 
        console.error(err);
        return res.status(504).json({ msg: 'Internal server error' });
    }
});
app.post("/putfac",(req,res,next)=>{
  const{name,password}=req.body.faclt;
  const facu=new facualtylog({
      name,
      password,
    
  })
  try{
      
     
      facu.save();
  return res.status(202).json({msg:'Registered'})

            
  
      }
  catch(err)
  {
      console.log('err')
      //  return res.status(341).json({msg:'not inserted'})

  }
  
  }
  )
// app.post('/activity',(req,res,next)=>{
//    let activity = new Date()
//    let pinno=req.body.y
//     let dayt= new act({
// activity,
// pinno
//     })
// try{
//     dayt.save()
//     return res.status(200).json({msg:"stored"})
// }
// catch(err)
// {
// return res.status(230).json({msg:'err'})
// }
// })
// app.get('/getact/:nam',async(req,res,next)=>
// {
// const reqdata=req.params.nam
// try{
// let redat=await act.find({pinno:reqdata})
// // if(redat.length==0)

// return res.status(234).json({redat})

// }
// catch(err)
// {
//     res.status(243).json({msg:"error"})
// }

// })
app.get('/reject/:xy/:yu',async(req,res,next)=>{
    let rej=req.params.xy;
    let vay=req.params.yu
    let rejmail
    let _name
    let _from 
    let _to
let _sub
let _at
    try{
let rejdata=await leavedat.find({_id:rej})
rejmail=rejdata[0].mail;
_name=rejdata[0].names
_from=rejdata[0].from
_to=rejdata[0].to
_sub=rejdata[0].subject
_at=rejdata[0].day

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kjanrdhanarajesh@gmail.com',
      pass: 'fodp xgox szzk difp'
    }
  });
  
  var mailOption = {
    from: 'kjanrdhanarajesh@gmail.com',
    to: rejmail,
    subject: 'leave permission',
    html:"Mrs/Mr"+" "+_name+" "+"you have requested for leave from"+" "+_from+" "+"to"+" "+_to+" "+"due to"+" "+_sub+" "+" is rejected by"+" "+vay+" "+"and you have to attend the college asusual."+" "+"which is requested on"+" "+_at
  };
  
  transport.sendMail(mailOption, function(error, info){
    if (error) {
      console.log(error);
    } else {
    //   console.log('Email sent: ' + info.response);
      return res.status(242).json({msg:'mail sent'})
    }
      });
      
  }
  catch(err)
{
    return res.status(200).json({msg:'error'})
    // console.log(err)
}

    
})
app.get('/getactivity',async(req,res,next)=>
{
  try{
    let activite=await leavedat.find();
    res.status(421).json({activite})
  }
  catch(err)
  {
    return res.status(243).json({msg:"err"})
  }
})
app.get('/checkstud/:_names',async(req,res,next)=>
{
  let studat=req.params._names
  try{
let chekstud=await formo.find({name:studat})
if(chekstud.length==0)
{
  return res.status(254).json({message:'notfound'})
}
else{
  return res.status(243).json({message:"found"})
}
  }
  catch(err){
return res.status(255).json({message:"err"})
  }
})
const storag = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/image')
  },
  filename: function (req, file, callback) {
    callback(null,file.originalname)
  }
})
const uploa = multer({ storage: storag })

app.put('/putnote',uploa.single("fil"),(req,res,next)=>
{
const profil= (req.file) ? req.file.originalname : null
let tim=new Date()
const{disc,pinno}=req.body
let notdat= new notice({
  disc,
  profil,
  pinno,
tim
})
try{
  notdat.save()
  return res.status(241).json({msg:"submitted"})

}
catch(err){
console.log("err")}
})
app.use(express.static('public'))
app.get('/getnote',async(req,res,next)=>{
    let note
    try{
        note=await notice.find()
    }
    catch(err)
    {
        console.log(err)

    }
    if(!note)
    {
        console.log('user not found');
    }
    
    return res.status(200).json({note})
})
app.get('/getnot',async(req,res,next)=>
{
  try{
    let notu=await notice.find()
    return res.status(243).json({notu})

  }
  catch(err)
  {
    console.log('err')
  }
})
app.delete('/delnote:kl',async(req,res,next)=>
{
  let id=req.params.kl
  try{
    let dat=await notice.findByIdAndDelete(id)
  }
  catch(err)
  {
    console.log('error')
  }
})
app.get('/getpassword/:otp/:esd',async(req,res,next)=>
{
  let Otp=req.params.otp
  let pin=req.params.esd
let nam
  try{
  // leavedat.find({_id:rej})
  // rejmail=rejdata[0].mail;
  // _name=rejdata[0].names
  // _from=rejdata[0].from
  // _to=rejdata[0].to
  // _sub=rejdata[0].subject
  // _at=rejdata[0].day

  let val=await formo.find({name:pin})
  if(val.length==0)
  {
    return res.status(243).json({msd:"notfound"})
  }
nam=val[0].mail
  
  var transpor = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kjanrdhanarajesh@gmail.com',
        pass: 'fodp xgox szzk difp'
      }
    });
    
    var mailOptio = {
      from: 'kjanrdhanarajesh@gmail.com',
      to:nam,
      subject: "otp for password recovery from lnms",
      html:Otp,
    }
    
    transpor.sendMail(mailOptio, function(error, info){
      if (error) {
        console.log(error);
      } else {
      //   console.log('Email sent: ' + info.response);
        return res.status(243).json({msg:'mail sent'})
      }
        });
        
    }
    catch(err)
  {
    console.log(err)

      return res.status(200).json({msg:'error'})
  }
  
  
      
})
app.get('/postpass/:dat',async(req,res,next)=>{
  let user=req.params.dat
  let userpass;
  let mal

  try{
    let getr=await formo.find({name:user})
    userpass=getr[0].password
mal=getr[0].mail
    var transpo = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kjanrdhanarajesh@gmail.com',
        pass: 'fodp xgox szzk difp'
      }
    });
    
    var mailOpti = {
      from: 'kjanrdhanarajesh@gmail.com',
      to:mal,
      subject: 'your password for lnms',
      html:userpass,
    }
    
    transpo.sendMail(mailOpti, function(error, info){
      if (error) {
        console.log(error);
      } else {
      //   console.log('Email sent: ' + info.response);
        return res.status(242).json({msg:'mail sent'})
      }
        });
        
    }
    catch(err)
  {
    console.log(err)

      return res.status(201).json({msg:'error'})
  }
  
  
  }
)

app.get('/getstu',async(req,res,next)=>
{
  try{
    let stddata=await formo.find()
    return res.status(234).json({stddata})
  }
  catch(err)
  {
    console.log('error')
  }
})
app.get('/gets/:pin', async (req, res, next) => {
  let _pin = req.params.pin;
  let getdet;
  let id;
  try {
    getdet = await formo.find({ name: _pin });
    if (getdet.length === 0) {
      return res.status(404).json({ msg: "notfound" });
    } else {
      id=getdet[0]._id
      return res.status(200).json({ getdet,id });
    }
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({ msg: "internal server error" });
  }
});
app.put('/putstud/:_Id',async(req,res,next)=>{
  let id=req.params._Id
  const{name,password,pin,branch,mail}=req.body.dtaa
  try{
let getr= await formo.findByIdAndUpdate(id,{
name,
password,
pin,
branch,
mail
})
return res.status(234).json({msg:"edit"})
  }
  catch(err)
  {
    console.log('error')
  }
})
app.get('/findfac/:nam',async(req,res,next)=>{
  let _name=req.params.nam
  let faco;
  try{
faco=await facualtylog.find({name:_name})
if(faco.length==0)
{
  return res.status(200).json({msg:"nofound"})
}
else{
  return res.status(201).json({msg:"found"})
}
  }
  catch(err)
  {
    console.log('error')
  }
})



app.get ('/getfaco',async(req,res ,next)=>{
 try {
  let faco= await facualtylog.find()
  return res.status(201).json({faco})
  }
  catch(err)
  {
    console.log('error')
  }

})
app.get('/dat/:xy',async(req,res,next)=>{
  let id=req.params.xy
  let respo
  try{
    let resp=await leavedat.find({_id:id})
respo=resp[0].status
    return res.status(200).json({respo})
  }
  catch(err)
  {
    console.log('error')
  }
})
app.get('/getr/:x',async(req,res,next)=>{
  let de=req.params.x
let gtou
  try{
    let lo=await leavedat.find({_id:de})
    gtou=lo[0].status
    return res.status(200).json({gtou})
  }
  catch(err)
  {
    console.log("error")
  }
})
