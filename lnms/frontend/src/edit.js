import axios from "axios"
import { useEffect, useState } from "react"

function Edit()
{
    const[dtaa,changedata]=useState({
        'name':'',
        'password':'',
        'pin':'',
        'branch':'',
        'mail':''
    })

    // const[gdat,getdata]=useState([])
   console.log(dtaa.name)
var pin=localStorage.getItem('userdata')
//    let name=localStorage.getItem('username')
//    let branch= localStorage.getItem('userbranch')
//    let mail=localStorage.getItem('usermail')
//    let pass=localStorage.getItem('userpass')
useEffect(() => {
    axios.get('http://localhost:5001/gets/' + pin).then((res) => {
        console.log(res.data.getdet)
        if (res.data.msg === "notfound") {
            
        } else {
        
            changedata(res.data.getdet[0])
            let ids=res.data.id
            localStorage.setItem('idl',ids)
        }
    })
}, [1])

const putdu=(e)=>{
e.preventDefault();
let _Id=localStorage.getItem('idl')
axios.put('http://localhost:5001/putstud/'+_Id,{dtaa}).then((res)=>{
    if(res.data.msg=="edit")
    {
        alert('updated successfully ')
    }
})
}
    return(
        <div id="editdiv">
            <form onSubmit={putdu}>
            <label className="iop">name:</label>
            <input className="ior" type="text"  value={dtaa.pin} onChange={(e)=>changedata({...dtaa,pin:e.target.value})}/>
            <br/>
            <br/>
            <label className="iop">pinno:</label>
            <input className="ior" type="text" value={dtaa.name} onChange={(e)=>changedata({...dtaa,name:e.target.value})}/>
            <br/>
            <br/>
<label className="iop">branch:</label>
<input className="ior" type="text" value={dtaa.branch} onChange={(e)=>changedata({...dtaa,branch:e.target.value})}/>
<br/>
<br/>       
<label className="iop">email:</label>
<input className="ior" type="email"  value={dtaa.mail} onChange={(e)=>changedata({...dtaa,mail:e.target.value})}/>
<br/>
<br/>
<label className="iop">password:</label>
<input className="ior" type="text" value={dtaa.password} onChange={(e)=>changedata({...dtaa,password:e.target.value})}/>
<br/>
<br/>

<input type="submit" value="change" />
</form>
        </div>
    )
}
export default Edit