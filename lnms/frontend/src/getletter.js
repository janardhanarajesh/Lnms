function Getletter()
{
    return(
        <div>
            <h1>getdata</h1>
            <table>
                {
                    getdata.map((ele,i,ery)=>
                    {
                        return(
                          <tr>
                            <td>{names}</td>
                            <td>{pinno}</td>
                            <td>{branch}</td>
                            <td>{year}</td>
                            <td>{section}</td>
                            <td>{from}</td>
                            <td>{to}</td>
                            <td>{subject}</td>
                            <td><img src=""/></td>

                          </tr>  
                        )
                    })
                }
            </table>
        </div>
    )
}