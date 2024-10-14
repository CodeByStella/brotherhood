'use client'

import { NOTIFICATIONS_STATE, QUERY_PARAMS } from "@/constants"
import { useState } from "react"
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { GoUnread } from "react-icons/go";
import { RiSendPlaneLine } from "react-icons/ri";
import NotificationItem from "../Small Pieces/NotificationItem";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import { Spin } from "antd";

interface NotificationsProps {
    notifications: {
        read: {
            topic: string,
            message: string,
            from: string,
            created_at: string,
        }[],
        unread: {
            topic: string,
            message: string,
            from: string,
            created_at: string,
        }[],
        sent: {
            message: string,
            created_at: string
        }[]
    }
}

export default function Notifications({ notifications }: NotificationsProps) {

    const [currentState, setCurrentState] = useState<NOTIFICATIONS_STATE>(NOTIFICATIONS_STATE.read)
    const [selectAll, setSelectAll] = useState<boolean>(false)
    const [isDeleteingAll, setIsDeletingAll] = useState<boolean>(false)
    const searchParams = useSearchParams()
    const currentPage = searchParams.get(QUERY_PARAMS.page)

    async function handleDeleteAll() {
        //TODO: Make an HTTP request to the endpoint that deletes all the notitifcations based on the current page and type(read, unread or sent)
        setIsDeletingAll(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsDeletingAll(false)
        }
    }

    return (
        <section className='mt-10'>
            <div className="flex items-start justify-between">
                <div>
                    <button onClick={() => setCurrentState(NOTIFICATIONS_STATE.read)} className={`flex items-center gap-2 ${currentState === NOTIFICATIONS_STATE.read ? "text-blue-600" : "text-black"}`}>
                        <MdOutlineMarkEmailRead className="w-5 h-5" />
                        <h2 className="max-sm:text-lg sm:text-xl font-semibold"> Read </h2>
                    </button>
                    {currentState === NOTIFICATIONS_STATE.read && <hr className="mt-2 border-2 border-blue-600 w-[85px]" />}
                </div>
                <div>
                    <button onClick={() => setCurrentState(NOTIFICATIONS_STATE.unread)} className={`flex items-center gap-2 ${currentState === NOTIFICATIONS_STATE.unread ? "text-blue-600" : "text-black"}`}>
                        <GoUnread className="w-5 h-5" />
                        <h2 className="max-sm:text-lg sm:text-xl font-semibold"> Unread </h2>
                    </button>
                    {currentState === NOTIFICATIONS_STATE.unread && <hr className="mt-2 border-2 border-blue-600 w-[110px]" />}
                </div>
                <div>
                    <button onClick={() => setCurrentState(NOTIFICATIONS_STATE.sent)} className={`flex items-center gap-2 ${currentState === NOTIFICATIONS_STATE.sent ? "text-blue-600" : "text-black"}`}>
                        <RiSendPlaneLine className="w-5 h-5" />
                        <h2 className="max-sm:text-lg sm:text-xl font-semibold"> Sent </h2>
                    </button>
                    {currentState === NOTIFICATIONS_STATE.sent && <hr className="mt-2 border-2 border-blue-600 w-[85px]" />}
                </div>
            </div>
            <div className="mt-10">
                {/* TODO: This needs to be replaced with the actual data later */}
                {/* FAKING AN ARRAY OF NOTIFICATIONS THAT ARE READ */}
                {currentState === NOTIFICATIONS_STATE.read && Array.from({ length: 10 }, (_, index) => index + 1).map((index) => {
                    return (
                        <NotificationItem key={index} topic=" New Comment" message="John Doe commented on your post 'Monday Motivation Hacks" from="Jhon Doe" created_at="2023-02-20 14:30:45" selectAll={selectAll} />
                    )
                })}
                {/* FAKING AN ARRAY OF NOTIFICATIONS THAT ARE UNREAD */}
                {currentState === NOTIFICATIONS_STATE.unread && Array.from({ length: 10 }, (_, index) => index + 1).map((index) => {
                    return (
                        <NotificationItem key={index} topic=" New Comment" message="John Doe commented on your post 'Monday Motivation Hacks" from="Jhon Doe" created_at="2023-02-20 14:30:45" selectAll={selectAll} />
                    )
                })}
                {/* FAKING AN ARRAY OF NOTIFICATIONS THAT ARE SENT */}
                {currentState === NOTIFICATIONS_STATE.sent && Array.from({ length: 10 }, (_, index) => index + 1).map((index) => {
                    return (
                        <NotificationItem key={index} topic=" New Comment" message="John Doe commented on your post 'Monday Motivation Hacks" from="Jhon Doe" created_at="2023-02-20 14:30:45" selectAll={selectAll} />
                    )
                })}
                <Pagination TotalNumberOfResults={40} pageSize={10} />
                <div className="max-sm:mt-16 sm:mt-10 flex items-center justify-start gap-6">
                    <button disabled={selectAll || isDeleteingAll} onClick={() => setSelectAll(true)} className="border border-navy rounded-md px-5 py-2 text-navy text-base font-semibold disabled:cursor-not-allowed">
                        Select All
                    </button>
                    <button disabled={isDeleteingAll} onClick={() => setSelectAll(false)} className="border border-navy rounded-md px-5 py-2 text-navy text-base font-semibold disabled:cursor-not-allowed">
                        Unselect All
                    </button>
                    {selectAll && <button disabled={isDeleteingAll} onClick={handleDeleteAll} className="bg-navy w-[100px] h-auto rounded-md text-base text-white px-5 py-2 focus-visible:outline-none">
                        {isDeleteingAll ? <Spin spinning={isDeleteingAll} /> : "Delete"}
                    </button>}
                </div>
            </div>
        </section>
    )
}
