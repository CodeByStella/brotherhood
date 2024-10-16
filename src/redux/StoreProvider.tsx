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



    useEffect(() => {
        store.dispatch(set_current_user(user))

    }, [user, loading])

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
