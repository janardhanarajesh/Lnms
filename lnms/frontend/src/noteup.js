import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import { Link } from "react-router-dom"
function Notice()
{
    const[note,getnote]=useState({
        'profilel':'',
        'discription':'',
        'pin':''  
     })

    const putnote=(h)=>
    {
        h.preventDefault()
     let nom=document.getElementById('nom').value
        const profill= new FormData()
  profill.append('fil',note.profilel,note.profilel.name)
  profill.append('disc',note.discription)
  profill.append('pinno',nom)

axios.put('http://localhost:5001/putnote',profill).then((res)=>{
alert(res.data.msg)
window.location.reload()

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
let nom=localStorage.getItem('user')

    return(
        <div>
<div><Link to="/beforenote"><button>previous notice</button></Link> </div>
          
<h1>upload notice</h1>
           
        <center>
                
       
        <div id="notdiv"  >
            <form onSubmit={putnote} >           <label>file:</label>
            <input type="file" id="inpdiv" name="file" onChange={(e)=>getnote({...note,profilel:e.target.files[0]})} required/>
            <br/>
            <label style={{marginTop:"100px",marginLeft:'30px'}} className="inlabs">description:</label>
            <textarea id="texdiv" onChange={(e)=>getnote({...note,discription:e.target.value})} required>

            </textarea>
            <br/>
        
            <input type="text" id="nom" value={nom} onChange={(e)=>getnote({...note,pin:e.target.value})} readOnly required/>
            <input type="submit"/>
           </form>
        </div>
        </center>
        </div>
    )
}
export default Notice