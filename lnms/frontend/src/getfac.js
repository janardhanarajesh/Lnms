import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
const Getfac = () => {
    const [fun,getfun]=useState([])
    useEffect(()=>{
        axios.get( 'http://localhost:5001/getfaco').then((res)=>{
            getfun(res.data.faco)
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
  return (
    <center>

    <div style={{width:"300px"}}>
        <table >
            <tr>
                <th>s.no</th>
                <th>name</th>
        
            </tr>
            {
     fun.map((ele,i)=>
     {
         return(
             <tr key={i+1}>
              <td>
                {i+1}
              </td>
                 <td>
                     {ele.name}
                 </td>
              
                 </tr>
                 )
        })
    }
            
        </table>
    </div>
    </center>

  )
}

export default Getfac;