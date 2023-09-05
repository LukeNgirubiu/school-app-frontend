import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { actions } from "../stores";
import { validateLogin } from "../utils/validate";
import Notifier from "../components/Notification";

const Login=()=>{
const dispatch=useDispatch()
const navigate=useNavigate()
const [email,setEmail]=useState('')
const updateEmail=(e)=>{
    setEmail(e.target.value)
}

const [password,setPassword]=useState('')
const updatePassword=(e)=>{
    setPassword(e.target.value)
}
const [error,setErrors]=useState([])
const [notify,setNotice]=useState(false)
const [notification, setNotify]=useState('')
const [alerttype,setAlert]=useState({})
const closeNotice=()=>{
  setNotice(false)
  setNotify("")
}
const changeNotify=(contents)=>{
  setNotify(contents)
  setNotice(true)
  setAlert({colors:'alert-color-error',display:''})
 }
 const setWait=()=>{
  setNotify('Please wait ...')
  setAlert({colors:'alert-color-wait',display:'diplay-none'})
  setNotice(true)
 }
const submit=async(e)=>{
  e.preventDefault()
const {valid, errors}=validateLogin({email,password})
setErrors(errors)
if(valid){
  setWait()
  try{
    const {status,data}=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/staff/login`,{email,password})
    if(status===201){
      setNotice(false)
      dispatch(actions.login({token:data.token,refresh_token:data.refresh_token}))
      navigate('/')
    }
  }
  catch(e){
    if(e.hasOwnProperty('response')){
      const { response }=e
      if(response.status===401){
        changeNotify("Incorrect password")
      }
      if(response.status===404){
        changeNotify("Error, please register with us or use another email")
      }
    }
    else{
      console.log("Response ",)
      changeNotify("Error when trying to login")
    }
  }
}
}
 return (
    <div className="page-body">
        <div className="form-header">
          <h2>{process.env.REACT_APP_TITLE}</h2>
        </div>
        {/* alert-color-error  alert-color-wait*/}
        {notify&&<Notifier type={alerttype} contents={notification} close={closeNotice}/>}
        <form onSubmit={submit}  className="form">
          <h3 className="heading-form heading-spacing">Login Here</h3>
           <div className="input-cls">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" value={email} onChange={updateEmail}/>
              <p className='input-error'>{error[0]}</p>
            </div>
            <div className="input-cls">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={updatePassword}/>
              <p className='input-error'>{error[1]}</p>
            </div>
            <div className="btn-cls">
              <button className="form-btn">Login</button>
              <Link to={'/register'}><p>Don't have an account</p></Link>
            </div>
        </form>
    </div>
 )
}
export default Login