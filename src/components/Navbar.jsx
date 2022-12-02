import SearchContact from "./contact/SearchContact";
import {useLocation} from "react-router-dom";


import {Purple , Background} from '../helpers/color';
const Navbar = ()=>{
    const location = useLocation();

    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"  style={{backgroundColor:Background}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                            <div className="navbar-brand">
                                <i className="fa fa-id-badge"  style={{color: Purple}}></i>
                                وب اپلیکیشن مدیریت مخاطبین {" "}
                                <span style={{color:Purple}}></span>
                            </div>
                    </div>
                    <div className="col">
                        <SearchContact ></SearchContact>
                    </div>
                </div>
            </div>
        </nav>

    )
}
export default Navbar;