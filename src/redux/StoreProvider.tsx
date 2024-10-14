'use client'

import { Provider } from "react-redux"
import store from "./store"
import { stop_loading, set_current_user } from "@/redux/features/UserSlice"
import { useEffect, useCallback } from "react"
import { useAuthListener } from "@/lib/persistentSession"

interface StroreProviderProps {
    children: React.ReactNode
}

export default function StoreProvider({ children }: StroreProviderProps) {
    const { user, loading } = useAuthListener()

    // const fetchUser = useCallback(async () => {
    //     try {
    //         // TODO: Make an Http request to an endpoint the returns the current authenticated user or  null
    //         const user = {
    //             email: "abebe@gmail.com",
    //             username: "abebe232",
    //             firstName: "Abebe",
    //             lastName: "Balcha",
    //             followers: 208,
    //             following: 128,
    //             referalId: "42501225585",
    //             city: "Addis Ababa",
    //             country: "Ethiopia"
    //         }

    //         // store.dispatch(set_current_user(user))
    //     }
    //     catch (error: any) {
    //         console.log(error)
    //     }
    //     finally {
    //         store.dispatch(stop_loading())
    //     }
    // }, [])

    useEffect(() => {
        store.dispatch(set_current_user(user))

    }, [user, loading])

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
