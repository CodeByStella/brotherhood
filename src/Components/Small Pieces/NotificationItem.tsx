'use client'

import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { FaRegTrashAlt } from "react-icons/fa"
import { LuClock4 } from "react-icons/lu"
import { MdOutlineArchive } from "react-icons/md"
import { RiMailOpenLine } from "react-icons/ri"
import { convertDate } from "@/utils"

interface NotificationsItem {
    topic: string,
    message: string,
    from: string,
    created_at: string,
    read?: boolean,
    selectAll: boolean
}

export default function NotificationItem({topic, message, from, created_at, read=false, selectAll} : NotificationsItem) {

    const [showOptions, setShowOptions] = useState<boolean>(false)
    const [isProcessing, setIsProccessing] = useState<boolean>(false)
    const [checkState, setCheckState] = useState<boolean>(false)

    // Sice message is a unique data for each notifications
    async function handleDelete(){
        //TODO: Make an HTTP request to delete this notification
        setIsProccessing(true)
        try{

        }
        catch{

        }
        finally{
            setIsProccessing(false)
        }

    }

    async function hanldeMarkAsRead(){
        //TODO: Make an HTTP request to mark the this notification as read. which is simply removing from
        setIsProccessing(true)
        try{

        }
        catch{

        }
        finally{
            setIsProccessing(false)
        }
    }

    async function handleArchive(){
        //TODO: Make an HTTP request to archive the this notification
        setIsProccessing(true)
        try{

        }
        catch{

        }
        finally{
            setIsProccessing(false)
        }
    }

    async function handleSnooze(){
        //TODO: Make an HTTP request to snooze the this notification
        setIsProccessing(true)
        try{

        }
        catch{

        }
        finally{
            setIsProccessing(false)
        }
    }

    return (
        <div onMouseOver={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)} className="bg-button mt-1.5 w-full border-none rounded-md focus:outline-none max-sm:px-3 sm:px-6 pt-4 max-sm:pb-5 sm:pb-3">
            <div className="flex sm:flex-wrap items-start gap-2">
                <Checkbox checked={selectAll ? selectAll : checkState } onClick={() => setCheckState((state) => !state)} className="w-4 h-4 rounded-[4px] mt-1.5 mr-3 checked:text-blue-600" />
                <h3 className="max-sm:text-sm sm:text-base text-navy font-semibold font-palanquin"> {topic} </h3> -
                <p className="max-sm:text-sm sm:text-[15px] text-black font-palanquin"> {message} </p>
            </div>
            {showOptions && <div className="flex items-center justify-between mt-1">
                <p className="max-sm:text-xs sm:text-sm text-navy font-semibold opacity-80 mt-2 ml-9"> From: {from} </p>
                <div className="flex items-center justify-end gap-3 mt-1.5">
                    <button disabled={isProcessing} onClick={() => handleDelete()}>
                        <FaRegTrashAlt className="w-4 h-4" />
                    </button>
                    <button disabled={isProcessing} onClick={() => handleSnooze()} className="disabled:cursor-not-allowed">
                        <LuClock4 className="w-4 h-4" />
                    </button>
                    <button disabled={isProcessing} onClick={() => handleArchive()} className="disabled:cursor-not-allowed">
                        <MdOutlineArchive className="w-4 h-4" />
                    </button>
                    {/* Only display the mark as read button if the notification is within the unread section */}
                    {!read && <button disabled={isProcessing} onClick={() => hanldeMarkAsRead()} className="disabled:cursor-not-allowed">
                        <RiMailOpenLine className="w-4 h-4" />
                    </button>}
                </div>
            </div>}
            {!showOptions && <p className="flex justify-end text-sm text-black font-semibold"> {convertDate(created_at)} </p>}
        </div>
    )
}
