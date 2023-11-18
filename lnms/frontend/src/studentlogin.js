import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Leave from "./studleave";
import App from "./App";
// SourceComponent.js

function Stdlog() {

// const[actdata,getact]=useState([])

// var redk=document.getElementById('dat').style.display="none"

  var [datafind, searchdata] = useState({
    'name': '',
    'password': ''
  });
  // const[getacrt,actr]=useState([])
//   function doc()
//   {
//   document.getElementsByTagName('p').style.display="none"
//   }
//   doc();
// function okr()
// {

// }
  // const {name} = useParams();
  // const [foundstudent, getstudent] = useState([]);
  let userFound = false;
var name=datafind.name;
var password=datafind.password
  function finddata(event) {
    event.preventDefault();
    axios.get("http://localhost:5001/getstud/"+name+"/"+password).then((res) => {
      if(res.data.msg=='notfound')
      {
alert('invalid username or password')
// actr(res.data.stulo)
// window.location.reload()

      }
    else
    {
      // getstudent(res.data.studentlog);
      var stud=res.data.stulo
      var stname=res.data.stuname;
      var stbranch=res.data.stubranch
      var stmail=res.data.stumail
    
      alert("logged in as"+" "+stud)
      window.location.href="/studleave";
      localStorage.setItem('userdata',stud)
      localStorage.setItem('username',stname)
      localStorage.setItem('userbranch',stbranch)
      localStorage.setItem('usermail',stmail)

     
    }
      


    });

  }


  return (
    <div>
      <center>
      <div id="studlog" >
      <h1 >student login</h1>
      <form onSubmit={finddata} autoComplete="off">
        <label className="stulolab">pin no:</label>
        <input type="text" name="name" id="login" onChange={(e) => searchdata({ ...datafind, name: e.target.value })} required/>
        <br />
        <label className="stulolab">password:</label>
        <input type="password" name="password" onChange={(e) => searchdata({ ...datafind, password: e.target.value })} required/>
        <br />
        <input type="submit" value="log in" id="stulolog"/>
      </form>
      <Link to="/getpass" id="fropass" >forgot password ?</Link>
     
      </div>
      </center>

      {/* <table>
     
    
    </table> */}

    </div>
    

  );
}

export default Stdlog;
// export const someData = "Hello from Source Component";

