import { Link } from "react-router-dom"
function Menu()
{
    return(
        <div id="menudiv">
            <center>
                <div id="submenu">
            <div className="subdivmenu">
        <Link to="/" className="menulinik">student registration</Link>
        </div>
        <div className="subdivmenu" >
            <Link to="/studentlogin" className="menulinik">student login</Link>
            </div>
            <div className="subdivmenu">
            <Link to="/fac" className="menulinik">Facaulity login</Link>
            </div>
            </div>
            </center>
        </div>
    )
}
export default Menu