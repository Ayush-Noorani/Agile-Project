import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";



export const store=configureStore({
    reducer:{
        user
    }
})