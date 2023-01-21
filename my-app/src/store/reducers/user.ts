import { createSlice } from '@reduxjs/toolkit'
type initialStateType={
    isLoggedIn:boolean,
    userName:string,
    email:string,
}

const initialState:initialStateType={
    isLoggedIn:false,
    userName:"",
    email:""
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setIsLoggedIn:(state,action)=>{
            state.isLoggedIn=action.payload
        },
        setUser:(state,action)=>{
            state.userName=action.payload.userName
            state.email=action.payload.email
            state.isLoggedIn=true
        },
        discardUserData:(state)=>{
            state.isLoggedIn=false
            state.userName=""
            state.email=""
        }
    }
    
})

export const {discardUserData,setIsLoggedIn,setUser}=userSlice.actions

export default userSlice.reducer