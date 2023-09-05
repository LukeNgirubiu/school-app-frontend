import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Protected=({children})=>{
const authenticated=useSelector(state=>state.authenticated)
if(authenticated===true){
    return children
}
//login
    return <Navigate to='/login'/>
}
export default Protected