import React,{useState } from "react";
import { Link } from "react-router-dom";
import {validateBasic} from "../utils/validate";
import {useDispatch,useSelector } from "react-redux";
import { actions } from "../stores";
const Basics=(prop)=>{
    const dispatch=useDispatch()
    const form_data=useSelector(state=>state.registration.basic)
    const [errors,setErrors]=useState([])
    const [name,setName]=useState(form_data.name)
    const [address,setAddress]=useState(form_data.address)
    const [location,setLocation]=useState(form_data.location)
    const [phone,setPhone]=useState(form_data.phone)
    const [level,setLevel]=useState(form_data.level)
  
    const updateName=(e)=>{
     setName(e.target.value)
    }
    const updateAddress=(e)=>{
        setAddress(e.target.value)
       }
    const updateLocation=(e)=>{
        setLocation(e.target.value)
       }
    const updatePhonenumber=(e)=>{
        setPhone(e.target.value)
    }
    const updateLevel=(e)=>{
        setLevel(e.target.value)
    }
    const next=(e)=>{
        e.preventDefault()
        const {status,errors}=validateBasic(
            {
                name,
                address,
                location,
                phone,
                level
            }
        )
        setErrors(errors)
        if(status){
         dispatch(actions.setBasic({
            name,
            address,
            location,
            phone,
            level
        }))  
        prop.changePage(1)
        } 
    }

return(
    <div className="basics form">
        <form onSubmit={next}>
        <h3 className="heading-form heading-spacing">Rigistration</h3>
        <div className="input-cls">
            <label htmlFor="name">School name:</label>
            <input type="text" id="name" maxLength={30} value={name} onChange={updateName}/>
            <p className='input-error'>{errors[0]}</p>
        </div>
        <div className="input-cls">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" maxLength={30} value={address} onChange={updateAddress}/>
            <p className='input-error'>{errors[1]}</p>
        </div>
        <div className="input-cls">
            <label htmlFor="location">Situate at:</label>
            <input type="text" id="location" maxLength={30} value={location} onChange={updateLocation}/>
            <p className='input-error'>{errors[2]}</p>
        </div>
        <div className="input-cls">
            <label htmlFor="phone">Mobile number:</label>
            <input type="tel" id="phone" maxLength={30} value={phone} onChange={updatePhonenumber}/>
            <p className='input-error'>{errors[3]}</p>
        </div>
        <div className="input-cls">
            <label htmlFor="level">Institutional Level:</label>
            <input type="text" id="level" maxLength={30} value={level} onChange={updateLevel}/>
            <p className='input-error'>{errors[4]}</p>
        </div>
        <div className="btn-cls">
              <button className="form-btn">Next</button>
              <Link to={'/login'}><p>Do have an account?</p></Link>
            </div>
        </form>
    </div>
)
}
export default Basics