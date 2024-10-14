"use client"

import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "./features/UserSlice"


const store = configureStore({
    reducer: {
        user: UserSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store