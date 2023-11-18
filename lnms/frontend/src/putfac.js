import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
function Facput()
{
    const [faclt,putfac]=useState({
        'name':'',
        'password':''
    })
    let nam=faclt.name;
    let pass=faclt.password
    const sub=(e)=>
    {
        
        e.preventDefault();
        axios.get('http://localhost:5001/findfac/'+nam).then((rek)=>
        {
            if(rek.data.msg=="nofound")
            {
        axios.post('http://localhost:5001/putfac',{faclt}).then((res)=>{
            alert(res.data.msg)
            window.location.reload()
        })
    }
    else{
        alert('already registered')
    }
    })
    }
    useEffect(()=>
{
    if(!localStorage.getItem('user'))
    {
        alert('you have to login to access the page');
        window.location.href="/fac"
    }
},[1])
    return(
        <center>
            {/* <h1>register new fac</h1> */}
        <div  id="insert">
        
            <form onSubmit={sub}>           name :<input type="text" onChange={(e)=>putfac({...faclt,name:e.target.value})}/>
           <br/>
        <br/>
        <br/>
           
            password:<input type="password" onChange={(e)=>putfac({...faclt,password:e.target.value})}/>
        <br/>
        <br/>
      

        <input type="submit"/>
        </form>
        </div>
        </center>

    )
}
export default Facput
