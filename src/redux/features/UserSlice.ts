"use client"

import { USER } from "@/constants";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InitialSateType {
    isAuthenticated: boolean,
    isLoading: boolean,
    data: USER | null
}

const initialState: InitialSateType = {
    isAuthenticated: false,
    isLoading: true,
    data: null
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        set_current_user: (state, action: PayloadAction<USER|null>) => {
            // Let's mutate the original state, since redux toolkit allows us to do that
            if(action.payload===null){
                state.isAuthenticated = false

            }else state.isAuthenticated = true
            state.isLoading =  false
            state.data = action.payload
        },
        stop_loading: (state) => {
            state.isLoading =  false
        }
        // We can add other reducers here in the future
    }
})

export const {set_current_user, stop_loading} = UserSlice.actions
export default UserSlice.reducer