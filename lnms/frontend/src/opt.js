import axios from "axios"
import { useState } from "react"
function Otp()
{
    const[mail,getmail]=useState({
        'eml':''
    })

let esd=mail.eml
var i=0;
    const sendotp=(e)=>
    {
        i++;
        e.preventDefault()
        var otp=Math.floor((Math.random()*99999)+11111)
        localStorage.setItem('otps',otp)
        let userotp=document.getElementById('pask').value
        if(userotp.length==0)
        {
            alert('have to fill the username ')
        }
        if(i==2)
        {
            localStorage.removeItem('otps')
        }

        else{
        // let usermail=document.getElementById('inp1').value    
            axios.get('http://localhost:5001/getpassword/'+otp+"/"+esd).then((res)=>{
           if(res.data.msd=="notfound")
           {
            alert('not found')
           }
           else{
            alert(res.data.msg)
           }
            })
    
        console.log(otp)
  
        setTimeout(removeotp,120000)
        }
    }
    const removeotp=()=>
    {
        localStorage.removeItem('otps')
    }
    const sendpass=(k)=>
    {
k.preventDefault()
let fe=prompt('enter otp')
if(fe==localStorage.getItem('otps'))
{
let dat=esd;
axios.get('http://localhost:5001/postpass/'+dat).then((res)=>{
    alert(res.data.msg)
})
    }
     else{
        alert('invalid otp')
    }
    }

    return(
        <div id="passdiv">
            <center>
            <form onSubmit={sendpass}>
                {/* <label id="regpas">username:</label> */}
                <br/>
            

                <input type="text"  id="pask" placeholder="pinno" onChange={(e)=>getmail({...mail,eml:e.target.value})} required/>

<br/>
<br/>
<button id="hu" onClick={sendotp}>send otp</button>
<br/>
<br/>


<input type="submit" value="verify otp"/>

            </form>
            </center>
            <br/>
            <br/>
            <br/>

            <p>
            have to fill the otp with in 2 minutes
            </p>
        </div>
    )
}
export default Otp