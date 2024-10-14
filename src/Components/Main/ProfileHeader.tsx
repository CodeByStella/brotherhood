"use client"

import { usePathname } from "next/navigation"
import Avatar from "../Small Pieces/Avatar"
import Link from "next/link"
import { CiEdit } from "react-icons/ci"
import { Profile_Links } from "@/constants"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import TopPageHeader from "../Small Pieces/TopPageHeader"

interface ProfileHeaderProps {
    children: React.ReactNode
}

export default function ProfileHeader({children}: ProfileHeaderProps){

    const pathname = usePathname()
    const {data} = useSelector((state: RootState) => state.user)

    return (
        <main className="max-md:mx-5 md:mx-7 xl:mx-20 mb-10">
            <TopPageHeader pageCode="PG32" pageName={`${data?.firstName || ""} ${data?.lastName || ""}`} pageDescription="All information about the profile" />
            <div className="mt-14">
                <div className="flex flex-wrap max-sm:gap-8 items-center justify-between xl:mr-12">
                    <span className="flex items-start max-md:gap-3 gap-7">
                        <Avatar width="w-[60px]" height="h-[60px]" iconWidth="w-[25px]" iconHeight="h-[25px]" />
                        <h2 className="text-xl mt-4 text-black font-semibold"> {data?.firstName}  {data?.lastName} </h2>
                    </span>
                    <Link href="/edit-profile" className="w-[150px] flex items-center gap-2 border border-navy rounded-md px-4 py-2 ">
                        <CiEdit className="w-4 h-4 text-navy" />
                        <p className="text-navy text-sm font-semibold"> Edit Profile </p>
                    </Link> 
                </div>
                <div className="xl:mr-12">
                    <div className="max-sm:px-5 sm:px-7 md:px-10 lg:px-20 py-6 mt-10 flex max-sm:gap-10 sm:gap-16 items-center justify-start bg-button border-none focus-visible:outline-none ">
                        {Profile_Links.map((item) => {
                            return (
                                <div key={item.path}>
                                    <span className="flex justify-center">
                                        <Link href={`${item.path}`} className="text-base font-medium pl-3"> {item.label} </Link>
                                    </span>
                                    {pathname === item.path &&<hr className="mt-1 border-t-[3px] border-navy max-sm:w-[80px] sm:w-[95px] ml-3.5" />}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <section className="mt-5 mb-16">
                    {children}
                </section>
            </div>
        </main>
    )
}
