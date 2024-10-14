'use client'

import { message } from "antd"
import { useState } from "react"

type NotificationMessage = {
    username: string,
    subject: string,
    message: string
}

const InitialValue = {
    username: "",
    subject: "",
    message: ""
}

export default function GeneralFunctions() {

    const [state, setState] = useState<NotificationMessage>(InitialValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleSendNotification() {
        // check if data exists
        const allDataExists = Boolean(state.username) && Boolean(state.subject) && Boolean(state.message)
        if (!allDataExists) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP rrequest to send the notification to the user
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <section>
            <h3 className="text-base text-black font-semibold"> F18: Send Notifications Messages </h3>
            <div className="flex flex-wrap max-sm:w-[300px] sm:w-[340px] items-center max-sm:gap-5 sm:justify-between mt-10">
                <label className="text-base text-black font-palanquin"> Enter username </label>
                <input type="text" disabled={isLoading} placeholder="username" onChange={(e) => setState({ ...state, username: e.target.value })} className="functionsInput" />
            </div>
            <div className="flex flex-wrap max-sm:w-[300px] sm:w-[300px] items-center max-sm:gap-5 sm:justify-between mt-10">
                <label className="text-base text-black font-palanquin"> Subject </label>
                <input type="text" disabled={isLoading} placeholder="what's the topic ?" onChange={(e) => setState({ ...state, subject: e.target.value })} className="functionsInput" />
            </div>
            <div className="flex flex-wrap max-sm:w-[300px] sm:w-[380px] items-start max-sm:gap-5 sm:justify-between mt-10">
                <label className="text-base text-black font-palanquin"> Message </label>
                <textarea disabled={isLoading} onChange={(e) => setState({ ...state, message: e.target.value })} className="max-sm:w-[250px] sm:w-[280px] h-[140px] bg-button border border-gray-400 disabled:cursor-not-allowed focus-visible:outline-none px-5 py-2.5 rounded-md" />
            </div>
            <button disabled={isLoading} onClick={handleSendNotification} className="bg-navy mt-10 w-[150px] h-auto px-4 py-2 rounded-md focus-visible:outline-emerald-50 text-sm text-white disabled:cursor-not-allowed">
                send message
            </button>
        </section>
    )
}
