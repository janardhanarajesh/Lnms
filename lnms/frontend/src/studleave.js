import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import { someData } from "./studentlogin";
import { useEffect } from "react";
// import Student from "./student";
function Leave(ax)
{
    const[storeddata,storedata]=useState({
        'names':'',
        'pinno':'',
        'branch':'',
        'year':'',
        'section':'',
        'mail':'',
        'from':'',
        'to':'',
        'day':'',
        'subject':'',
        'profilepic':''
    
    
    })
    function putdata(h)
    {
    let day=new Date();
    h.preventDefault();
    let logva=document.getElementById('logout').value;
    let sb=document.getElementById('sbran').value;
    let sn=document.getElementById('snam').value
    let mlt=document.getElementById('ml').value
    const profilepicture= new FormData()
    profilepicture.append('file',storeddata.profilepic,storeddata.profilepic.name)
    profilepicture.append('names',sn)
    profilepicture.append('pinno',logva)
    profilepicture.append('branch',sb) 
    profilepicture.append('year',storeddata.year)
    profilepicture.append('section',storeddata.section)
    profilepicture.append('mail',mlt)
    
    
    profilepicture.append('from',storeddata.from)
    profilepicture.append('to',storeddata.to)
    profilepicture.append('day',day)
    
    profilepicture.append('subject',storeddata.subject)
    axios.put('http://localhost:5001/putstuddata',profilepicture).then((res)=>{
        alert(res.data.msg)
        window.location.reload()
    })
    
    
    }
    const lobut=()=>
    {
        localStorage.removeItem('userdata')
        localStorage.removeItem('username')
        localStorage.removeItem('userbranch')
        localStorage.removeItem('idl')
    localStorage.removeItem('user')



        window.location.href="/studentlogin"
    }
    useEffect(()=>
    {
        if(!localStorage.getItem('userdata'))
        {
            alert('you have to login to access the page');
            window.location.href="/studentlogin"
        }
    },[1])
    let studat=localStorage.getItem('userdata')
    let sname=localStorage.getItem('username')
    let sbranch=localStorage.getItem('userbranch')
    let smail=localStorage.getItem('usermail')

    


    return(
        <div>
          <center>
            <div id="logdiv">         <pre style={{fontSize:'20px'}} id="hel">  hello <b>{localStorage.getItem('userdata')}</b></pre>
          <Link to="/getnot"><button className="idr">notice</button></Link>
          <Link to="/editstu"><button className="idr">edit</button></Link>

       <button className="idr" onClick={lobut}>logout</button>
       </div>

 
 <div id="dat">
      <center> <h1>leave submiting form</h1></center>
             <form onSubmit={putdata} autoComplete="off" >
             <label className="inlab">Name:</label>
             <input type="text" name="name" className="ratu" id="snam" value={sname} onChange={(e)=>storedata({...storeddata,names:e.target.value})} required readOnly />
             <br/>
             <br/>
             <label className="inlab">Pin no:</label>
             <input type="text" name="pinno" id="logout" value={studat} className="ratu" readOnly required/>
             {/* onChange={(e)=>storedata({...storeddata,pinno:e.target.value})} */}
             <br/>
             <br/>
 
             <label className="inlab">Branch:</label>
             <input type="text" name="branch" className="ratu" id="sbran" value={sbranch} onChange={(e)=>storedata({...storeddata,branch:e.target.value})} required  readOnly/>
             <br/>
             <br/>
 
             <label className="inlab">Year:</label>
             <input type="number" name="year" className="ratu" onChange={(e)=>storedata({...storeddata,year:e.target.value})} required/>
             <br/>
             <br/>
 
             <label className="inlab">section:</label>
             <input type="text" name="year" className="ratu" onChange={(e)=>storedata({...storeddata,section:e.target.value})} required/>
             <br/>
             <br/>
 
             <label className="inlab">mail:</label>
             <input type="email" name="mail"  pattern=".+@gmail\.com" value={smail} title="have to enter the gmail only" className="ratu" id="ml" onChange={(e)=>storedata({...storeddata,mail:e.target.value})} required readOnly/>
             <br/>
             <br/>
 
             {/* <label className="inlab">Date:</label>
             <br/>  */}
            <label className="inlab">from</label> <input type="date" name="from" className="ratu" onChange={(e)=>storedata({...storeddata,from:e.target.value})} required/>
            <br/>
            <br/>
 
        <label className="inlab">to</label><input type="date" name="from" className="ratu" onChange={(e)=>storedata({...storeddata,to:e.target.value})} required/>
            <br/>
            <br/>
 
         {/* <label>today date:</label>
         <input type="text" name="to" onChange={(e)=>storedata({...storeddata,tod:new Date()})} readonly/>
 
             <br/> */}
             <label className="inlab">Subject:</label>
             <input type="text" name="subject" className="ratu" onChange={(e)=>storedata({...storeddata,subject:e.target.value})} required/>
             <br/>
             <br/>
 
             <label className="inlab">letter:</label>
             <input type="file"  name="file" className="ratu" onChange={(e)=>storedata({...storeddata,profilepic:e.target.files[0]})} required/>
         <br/>
         <br/>
 
         <br/>
         <input type="submit" />
         {/* <input type="reset"/> */}
 
         </form>
         
 </div>
 </center>
        </div>
    )
}
export default Leave