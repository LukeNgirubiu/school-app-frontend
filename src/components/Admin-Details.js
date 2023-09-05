import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { validatePersonal } from "../utils/validate";
import { actions } from "../stores";
const Admin=(prop)=>{
const personal_data=useSelector(state=>state.registration.personal)
const basic_data=useSelector(state=>state.registration.basic)
const dispatch=useDispatch()
const navigate=useNavigate()
const [errors,setErrors]=useState([])
const [name,setName]=useState(personal_data.name)
const updateName=(e)=>{
  setName(e.target.value)
}
const [role,setRole]=useState(personal_data.role)
const updateRole=(e)=>{
  setRole(e.target.value)
}
const [email,setEmail]=useState(personal_data.email)
const updateEmail=(e)=>{
    setEmail(e.target.value)
}
const [password,setPassword]=useState(personal_data.password)
const updatePassword=(e)=>{
  setPassword(e.target.value)
}
const [confirm,setConfirm]=useState(personal_data.confirm)
const updateConfirm=(e)=>{
  setConfirm(e.target.value)
}
const backPage=(e)=>{
    e.preventDefault() 
    prop.changePage(0)
    dispatch(actions.setPersonal({name,role,email,password,confirm}))
}
const onSubmit=async(e)=>{
    e.preventDefault()
    const {valid,error}=validatePersonal({name,email,role,password,confirm})
    setErrors(error)
    try{
      if(valid){
        prop.wait()
        const {status,data}=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register/school`,basic_data)
        console.log("Status ",data)
        if(status===201){
          const { status }=await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register/staff/${data.id}`,{name,email,role,password})
          if(status===201){
            dispatch(actions.resetRegistration())
            navigate('/')
          }
        }
      }
    }
    catch(e){
      if(e.hasOwnProperty('response')&&(e.response.status===400)){
        prop.notice(`Details provided already exist`)
      }
      else{
        prop.notice(`Error in trying to register`)
      }
    }
}
return(
    <div className="page-body">
        <div className='form-custom'>
          <div className="header-form">
            <h1 className="heading-form">Personal Details</h1>
          </div>
          <form onSubmit={onSubmit}>
            <div className="input-cls-2">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" maxLength={30} value={name} onChange={updateName}/>
              <p className='input-error'>{errors[0]}</p>
            </div>
            <div className="input-cls-2">
              <label htmlFor="role">Position:</label>
              <input type="text" id="role" maxLength={30} value={role} onChange={updateRole}/>
              <p className='input-error'>{errors[1]}</p>
            </div>
            <div className="input-cls-2">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" maxLength={30} value={email} onChange={updateEmail}/>
              <p className='input-error'>{errors[2]}</p>
            </div>
            <div className="input-cls-2">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" maxLength={30} value={password} onChange={updatePassword}/>
              <p className='input-error'>{errors[3]}</p>
            </div>
            <div className="input-cls-2">
              <label htmlFor="confirm">Confirm Password:</label>
              <input type="password" id="confirm" maxLength={30} value={confirm} onChange={updateConfirm}/>
              <p className='input-error'>{errors[4]}</p>
            </div>
            <div className="btn-cls-2">
              <button className="form-btn" onClick={backPage} >Back</button>
              <button className="form-btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
    </div>
)
}
export default Admin