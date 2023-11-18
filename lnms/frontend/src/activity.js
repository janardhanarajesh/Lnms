import { act } from "@testing-library/react"
import axios from "axios"
import { useEffect, useState } from "react"

 const Activity=()=>
{
    const[activity,getactivity]=useState([])
    useEffect(()=>
    {
        axios.get('http://localhost:5001/getactivity').then((res)=>
        {
            getactivity(res.data.activite)
        })
    })
    return(
        <div>
{
    activity.map((les,i)=>
    {
        return(
            <div className="actdiv">
                {les.datu}
                </div>
        )
    })
}
        </div>
    )
}
export default Activity