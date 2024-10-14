'use client'

import { useState } from "react"
import ApproveReject from "../Small Pieces/ApproveReject"

export type USERINFO = {
    avatar?: string,
    firstName: string,
    lastName: string,
    email: string,
    sex: string,
    city: string,
    userName: string,
    birthDate: string,
    telegramUsername: string,
    languageSpoken: string[],
    languagesWishToLearn: string[]
}
interface Props {
    accountsLits: USERINFO[]
}

export default function AccountApprovalManagement({accountsLits} : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openDetails, setOpenDetails] = useState<number | null>(null)


    async function handleApproveAccount(username: string | null){
        if(!username) return
        //TODO: Make an HTTP request to approve the user's account
        setIsLoading(true)
        try{

        }
        catch(error: any){

        }
        finally{
            setIsLoading(false)
        }
        
    }

    async function handleRejectAccount(username: string | null) {
        if(!username) return
        setIsLoading(true)
        //TODO: Make an HTTP request to Reject the account
        try{

        }
        catch(error: any){

        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section>
            <div className="mt-7">
                <h3 className="text-base text-black font-semibold"> F16: Approve and Reject Profile </h3>
                <div className="mt-6">
                    <ApproveReject list={accountsLits} handleApprove={handleApproveAccount} handleReject={handleRejectAccount} isLoading={isLoading} details={true} setOpenDetails={setOpenDetails} openDetails={openDetails} />
                </div>
            </div>
        </section>
    )
}
