import React,{useState} from "react";
import '../components/Navigation.css'
import { Link } from "react-router-dom";
const Navigation=()=>{
 const [cls,setCls]=useState("bars")
 const updateClass=()=>{
    if(cls==='bars'){
        setCls('bars click_items')
    }
    else{
        setCls('bars')
    }
    console.log("Class ",cls)

 }
    return(
        <header>
            {/* <h1></h1>
            <input type="checkbox" id="nav-toggle" className="nav-toggle"/> */}
            <nav>
              <ul className="menu">
                <li className="logo"> <Link to={'/'}>{process.env.REACT_APP_TITLE}</Link></li>
                <li className="item"> <Link to={'/'}>Exams</Link></li>
                <li className="item"> <Link to={'/'}>Parents</Link></li>
                <li className="item"> <Link to={'/'}>Notices</Link></li>
                <li className="item"> <Link to={'/'}>Staffs</Link></li>
                <li className="item"> <Link to={'/'}>Fees & Accounts</Link></li>
                <li className="btn"> <Link to={'/'}>Login</Link></li>
                <li className="toggle"><span className={cls} onClick={updateClass}></span></li>
              </ul>
            </nav>
        </header>
     
      
    )
}
export default Navigation