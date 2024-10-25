"use client"

import { usePathname } from "next/navigation"
// import Avatar from "../Small Pieces/Avatar"
import Link from "next/link"
import { CiEdit } from "react-icons/ci"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import TopPageHeader from "../Small Pieces/TopPageHeader"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { getBlogCounts } from "@/lib/Blog"
import { useRouter, useSearchParams } from "next/navigation";
import { getUserDoc } from "@/lib/persistentSession"

interface ProfileHeaderProps {
    children?: React.ReactNode
}

export default function ProfileHeader({ children }: ProfileHeaderProps) {

    const searchParams = useSearchParams()
    const userId = searchParams.get("id")

    useEffect(() => {
        if (userId) {
            getBlogCounts(userId).then(num => setPostCount(num || 0))

        }
    }, [userId])
    const { data: currentUserData, isAuthenticated } = useSelector((state: RootState) => state.user)
    const [postcount, setPostCount] = useState(0)
    const isProfilePage = isAuthenticated && currentUserData && userId === currentUserData.uid
    const [data, setData] = useState<any>({})
    useEffect(() => {
        if (userId) {
            getUserDoc(userId).then(
                res => setData(res || {})
            )
        }
    }, [])


    return (
        <main className="max-md:mx-5 md:mx-7 xl:mx-20 mb-10">
            <TopPageHeader pageCode="PG32" pageName={data?.nickName} pageDescription="All information about the profile" />
            <div className="mt-14">
                <div className="flex flex-wrap max-sm:gap-8 items-center justify-between xl:mr-12">
                    <span className="flex items-start max-md:gap-3 gap-7">
                        <Avatar
                            className="bg-navy"
                            size={72}
                            icon={<UserOutlined />}
                            src={data?.avatar}
                        />
                        {/* <Avatar width="w-[60px]" height="h-[60px]" iconWidth="w-[25px]" iconHeight="h-[25px]" /> */}
                        <div >
                            <h2 className="text-xl  text-black font-semibold">
                                {data?.nickName}
                            </h2>
                            <div>
                                @{data?.userName}
                            </div>
                            <div>
                                {postcount} posts
                            </div>
                        </div>
                    </span>

                    {isProfilePage && <Link href="/edit-profile" className="w-[150px] flex items-center gap-2 border border-navy rounded-md px-4 py-2 ">
                        <CiEdit className="w-4 h-4 text-navy" />
                        <p className="text-navy text-sm font-semibold"> Edit Profile </p>
                    </Link>}
                </div>

            </div>
        </main>
    )
}
