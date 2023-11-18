import axios from "axios"
import { useState } from "react"

function Facaulity()
{
    const[details,getdetails]=useState({
        'name':'',
        'password':''
    })
var name=details.name;
var password=details.password
    function faclog(ef)
    {
       
    
        ef.preventDefault();
axios.get('http://localhost:5001/faclog/'+name+"/"+password).then((res)=>
{
    if(res.data.msg=='notfound')
    {
alert('invalid username or password')
// window.location.reload()
    }
  else
  {
    let facp=res.data.facl
    alert("logged in as"+" "+facp)

    localStorage.setItem('user',facp)
    window.location.href = "/getinfo";

  }
})
        
    }
    return(
        <div>
            <center>
                <div id="faclog">            <h1>faculty login</h1>
            <form onSubmit={faclog} autoComplete="off">
                <label>username:</label>
                <input type="text" name="name" onChange={(e)=>getdetails({...details,name:e.target.value})} required/>
                <br/>
                <label>password:</label>
                <input type="password" name="password" onChange={(e)=>getdetails({...details,password:e.target.value })} required/>
          <br/>
          <input type="submit" value="log in" id="facu"/>
            </form>
            </div>
            </center>
        </div>
    )
}
export default Facaulity