import React,{useState} from "react";
// import { useSelector } from "react-redux";
import Basics from "../components/School-Details";
import Admin from "../components/Admin-Details";
import Notifier from "../components/Notification";

const Register=()=>{

    let [form_no,setForm]=useState(0)//useSelector(state=>state.form_no)
    const [notification, setNotify]=useState('')
    const [alerttype,setAlert]=useState({})
    const [notify,setNotice]=useState(false)
    const changePage=(num)=>{
        setForm(num)
    }
    const changeNotify=(contents)=>{
     setNotify(contents)
     setNotice(true)
     setAlert({colors:'alert-color-error',display:''})
    }
    const closeNotice=()=>{
        setNotice(false)
    }
    const setWait=()=>{
        setNotify('Please wait ...')
        setAlert({colors:'alert-color-wait',display:'diplay-none'})
        setNotice(true)
       }
return (
    <div className='page-body'>
        <div className="form-header">
            <h2>{process.env.REACT_APP_TITLE}</h2>
        </div>
        {notify&&<Notifier type={alerttype} contents={notification} close={closeNotice}/>}
        {form_no===0&& <Basics basic="Register" changePage={changePage}/>}
        {form_no===1&& <Admin changePage={changePage} notice={changeNotify} wait={setWait}/>}
    </div>
)
}
export default Register