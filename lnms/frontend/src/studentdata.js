import axios from "axios"
import { useEffect, useState } from "react"

function Studdat()
{
    const[studata,getstu]=useState([])
    useEffect(()=>
    {
        axios.get('http://localhost:5001/getstu').then((res)=>{
            console.log('ok')
            getstu(res.data.stddata)
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

    return(
        <div>
           <center> <table border="" cellSpacing="0px" width="1000" align="center">
           <th>sno</th>
                
                <th>pin no</th>
                <th>name</th>
                <th>branch</th>
                <th>mail</th>

                {
                   studata.map((ele,i)=>{
                    return(
                    <tr>
                         <td>
                            {i+1}
                        </td>
                        <td>
                            {ele.name}
                        </td>
                          <td>
                            {ele.pin}
                        </td>
                        <td>
                            {ele.branch}
                        </td>
                        <td>
                            {ele.mail}
                        </td>
                     
                    </tr>
                    )
                   }) 
                }
            </table>
            </center>
        </div>
        
    )
}
export default Studdat