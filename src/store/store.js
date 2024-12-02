import counterReducers from "../components/Slices/sliceCounter"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore ({
    reducer :{ 
        counter: counterReducers,
    }
})