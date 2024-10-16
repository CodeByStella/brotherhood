'use client'

import EditProfile from "@/Components/Main/forms/Edit Profile/EditProfile";
import { USER } from "@/Components/Main/forms/Registrationform";
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


export default function page() {
    //TODO: Fetch All the User's Data -> getAllUserData
    const { data } = useSelector((state: RootState) => state.user)


    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Edit profile page" pageDescription="Update your profile information" />
            <div className="mt-14">
                <EditProfile userData={data as USER} />
            </div>
        </main>
    )
}
