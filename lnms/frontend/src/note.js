import axios from "axios"
import { useEffect, useState } from "react"

function Notestud()
{
const[notice,getnotice]=useState([])
    useEffect(()=>
    {
        axios.get('http://localhost:5001/getnote').then((res)=>
        {
            getnotice(res.data.note)
        })
    })
    useEffect(()=>
{
    if(!localStorage.getItem('userdata'))
    {
        alert('you have to login to access the page');
        window.location.href="/fac"
    }
},[1])
    return(

        <center>
            
            <div>
{
    notice.map((ele,i)=>
    {
return(
    
    <div className="note" key={i}>
        <div className="disc">
            <br/>
          

       <b className="aut"> {ele.pinno}:</b>{ele.disc}
</div>
<br/>
<div className="imgk">
<img src={`http://localhost:5001/image/${ele.profil}`} height={300} width={300} style={{boxShadow:'none'}}/>
<br/>
</div>
<b>uploaded on:</b>{ele.tim}


        </div>
)
    })
}
</div>
    </center>
    )
}
export default Notestud