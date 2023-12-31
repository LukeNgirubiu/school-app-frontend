import { configureStore,createSlice } from "@reduxjs/toolkit";
const appSlice=createSlice({
    name:"auth",
    initialState:{authenticated:false,
        token:"",
        refresh_token:"",
        registration:{
            ongoing:false,
            basic:{
                name:'',
                address:'',
                location:'',
                phone:'',
                level:''
            },
            personal:{
                name:'',
                role:'',
                email:'',
                password:'',
                confirm:''
            }
        },
    },
    reducers:{
        login(state,action){
          state.authenticated=true
          state.token=action.payload.token
          state.refresh_token=action.payload.refresh_token
        },
        logout(state,action){
            state.authenticated=false
        },
        setBasic(state,action){
         state.registration.basic=action.payload
         state.registration.ongoing=true
        },
        setPersonal(state,action){
            state.registration.personal=action.payload
        },
        resetRegistration(state,action){
            state.registration.basic={
                name:'',
                address:'',
                location:'',
                phone:'',
                level:''
            }
            state.registration.personal={
                name:'',
                role:'',
                email:'',
                password:'',
                confirm:''
            }
        },
    }
})
export const actions=appSlice.actions
const store=configureStore({
    reducer:appSlice.reducer
})
export default store