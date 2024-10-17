import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../features/bookSlice';


const store = configureStore({
    reducer:{
        book:bookReducer
    }
})

export default store;