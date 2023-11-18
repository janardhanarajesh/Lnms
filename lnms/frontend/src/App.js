// import logo from './logo.svg';
import './App.css';
import { Route,Routes,BrowserRouter} from 'react-router-dom';
import Student from './student';
import Stdlog from './studentlogin';
import Leave from './studleave';
import Getdata from './getdata';
import Facaulity from './facaulity';
import Menu from './menu';
import Activity from './activity';
import Notice from './noteup';
import Facput from './putfac';
import Notestud from './note';
import Befnot from './beforenote';
import Otp from './opt';
import Studdat from './studentdata';
import Edit from './edit';
import Getfac from './getfac';
// import Acts from '../../backend/models/acts';
// impo
function App() {
  return (
    <div className='App'>
   <BrowserRouter>
   <Menu/>
   <Routes>
    <Route path='/' element={<Student/>}/>
    <Route path='/studentlogin' element={<Stdlog/>}/>
    <Route path='/studleave' element={<Leave/>}/>
    <Route path='/getinfo' element={<Getdata/>}/>
    <Route path='/fac' element={<Facaulity/>}/>
    <Route path='/act' element={<Activity/>}/>
    <Route path='/note' element={<Notice/>}/>
<Route path='/insertfac' element={<Facput/>}/>
<Route path='/getnot' element={<Notestud/>}/>
<Route path='/beforenote' element={<Befnot/>}/>
<Route path='/getpass' element={<Otp/>}/>
<Route path='/getstu' element={<Studdat/>}/>
<Route path='/editstu' element={<Edit/>}/>
<Route path='/getfac' element={<Getfac/>}/>








       </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
