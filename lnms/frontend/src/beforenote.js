import axios from "axios"
import { useEffect, useState } from "react"

function Befnot()
{
    const [note,getnote]=useState([])
    useEffect(()=>
    {
        axios.get('http://localhost:5001/getnot').then((res)=>
        {
            getnote(res.data.notu)
            let ret=res.data.notu
            if(ret.length==0)
            {
                alert('no data found')
                window.location.href="/note"
            }
        })
    })
    useEffect(()=>
    {
        if(!localStorage.getItem('user'))
        {
            alert('you have to login to access the page');
            window.location.href="/fac"
        }
    },[1])
    const delnot=(kl)=>
    {
        axios.delete('http://localhost:5001/delnote'+kl).then((res)=>
        {
            alert('sucessfully deleted')
        })
    }
    return(
        <div>
        {/* <h1>previous notices</h1> */}
            <table border="" cellSpacing="0px" id="befnot">
                <th>uploaded by</th>
                <th>discription</th>
                <th>remove</th>


                            {
                note.map((ele,i)=>
                {
                    return(
                  <tr>
                    <td>{ele.pinno}</td>
               
                    <td>{ele.disc}</td>
                    <td><button onClick={()=>delnot(ele._id)}>delete</button></td>
                    </tr>
                    )
                })

            }
            </table>
        </div>
    )
}
export default Befnot