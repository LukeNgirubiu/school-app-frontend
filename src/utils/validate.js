const validatePhoneNumber=(phoneNumber)=> {
    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (regex.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }

export const validateBasic=(data)=>{
const   {
    name,
    address,
    location,
    phone,
    level
}=data
let valid=true
let errors=["","","","",""]
if(name.trim().length===0){
errors[0]="* Name is empty"
valid=false
}
if(address.trim().length===0){
    errors[1]="* Address is empty"
    valid=false
}
if(location.trim().length===0){
    errors[2]="* Location is empty"
    valid=false
}
if(phone.trim().length===0){
    errors[3]="* Phone is empty"
    valid=false
}
if(level.trim().length===0){
    errors[4]="* Level is empty"
    valid=false
}
if(valid){
    const validateNum=validatePhoneNumber(phone)
    if(!validateNum){
        errors[3]="* Phone format is wrong"
        valid=false
    }
}
return {status:valid,errors:errors}
}
export const validatePersonal=(data)=>{
const {name,email,role,password,confirm}=data
let valid=true
const error=["","","","",""]
const emailRegex =new RegExp(/^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
if(name.trim().length===0){
error[0]="* Your name is required"
valid=false
}
if(role.trim().length===0){
    error[1]="* Your position is required "
    valid=false
 }
if(email.trim().length===0){
error[2]="* Your email is required"
valid=false
}
if(!emailRegex.test(email)&&email.trim().length>0){
error[2]="* Wrong email format"
valid=false
}
if(password.trim().length===0){
    error[3]="* Empty password"
    valid=false
}
if(confirm.trim().length===0){
    error[4]="* Empty confirm password"
    valid=false
}
if(password.trim().length>0&&password.trim().length<5){
    error[3]="* Password entered is too short"
    valid=false
}
if(confirm.trim().length>0&&confirm.trim().length<5){
    error[4]="* Confirm password too short"
    valid=false
}


if((confirm.trim().length>0&&password.trim().length>0)&&(password.trim()!==confirm.trim())){
    error[4]="* Password and confirm password are not matching"
    valid=false
}
return {valid:valid,error}
}
export const validateLogin=(data)=>{
const emailRegex =new RegExp(/^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");   
const {email,password}=data
let valid=true
const errors=["",""]
if(email.trim().length===0){
valid=false
errors[0]="* Empty email"
}
if(password.trim().length===0){
    valid=false
    errors[1]="* Empty password"
}
if(password.trim().length>0&&password.trim().length<5){
    valid=false
    errors[1]="* Password is too short"
}

if(email.trim().length>0&&!emailRegex.test(email.trim())){
    valid=false
    errors[0]="* Invalid email"
    }
return {valid, errors}
}