'use client'

import { PROFILE_DATA_SETTINGS, PUBLIC_DATA_SETTINGS } from "@/constants";
import { useState } from "react";
import SettingOptions from "../Small Pieces/SettingOptions";
import { areObjectsEqual } from "@/utils";
import { message, Spin } from "antd";

enum Options {
    Everyone = 'Everyone',
    Followers = 'Followers',
    Noone = 'Noone'
}

export type Profile_Setting_State = {
    profile_picture: string,
    followers_list: string,
    following_list: string,
    bio: string,
    blog_catagory_member_info: string
} & { [key: string]: Options | string }

export type Public_Setting_State = {
    blog_catagory_follow_info: string,
    blog_catagory_member_info: string,
    public_follow_list: string,
    department_member_info: string
} & { [key: string]: Options | string }

const Initial_Profile_data: Profile_Setting_State = {
    profile_picture: Options.Everyone,
    followers_list: Options.Everyone,
    following_list: Options.Followers,
    bio: Options.Everyone,
    blog_catagory_member_info: Options.Everyone
}

const Initial_Public_Data: Public_Setting_State = {
    blog_catagory_follow_info: Options.Everyone,
    blog_catagory_member_info: Options.Followers,
    public_follow_list: Options.Everyone,
    department_member_info: Options.Noone
}

export default function Settings() {

    const [profileData, setProfileData] = useState<Profile_Setting_State>(Initial_Profile_data)
    const [publicData, setPublicData] = useState<Public_Setting_State>(Initial_Public_Data)
    const [isSavingChages, setIsSavingChanges] = useState<boolean>(false)

    function handleProfileDataClick({ title, value }: { title: string, value: string }) {
        if (!title && !value) return
        const tempData: Profile_Setting_State = { ...profileData }
        tempData[title] = value
        setProfileData(tempData)
    }

    function handlePublicDataClick({ title, value }: { title: string, value: string }) {
        if (!title && !value) return
        const tempData: Public_Setting_State = { ...publicData }
        tempData[title] = value
        console.log(tempData)
        setPublicData(tempData)
    }

    async function handleSaveChanges() {
        // Check if there are any setting changes made
        const noProfileDataChangeMade = areObjectsEqual(profileData, Initial_Profile_data)
        const noPublicDataChangeMade = areObjectsEqual(publicData, Initial_Public_Data)
        if (noProfileDataChangeMade && noPublicDataChangeMade) {
            message.error("Nothing was changed")
            return
        }
        //TODO: Make an HTTP request to update the current user's setting
        setIsSavingChanges(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsSavingChanges(false)
        }
    }

    return (
        <section className="mt-10">
            <h4 className="text-xl text-blue-600 font-semibold font-palanquin"> Profile Data </h4>
            <SettingOptions settings={PROFILE_DATA_SETTINGS} data={profileData} handleClick={handleProfileDataClick} />
            <div className="mt-14">
                <h4 className="text-xl text-blue-600 font-semibold font-palanquin"> Public Data </h4>
                <SettingOptions settings={PUBLIC_DATA_SETTINGS} data={publicData} handleClick={handlePublicDataClick} />
            </div>
            <div className="mt-24 w-full flex items-center justify-center">
                <button onClick={handleSaveChanges} className="bg-navy w-[200px] h-auto px-7 py-3 rounded-md max-sm:text-sm sm:text-base text-white focus-visible:outline-none">
                    {isSavingChages ? <Spin spinning={isSavingChages} /> : "Save Changes"}
                </button>
            </div>
        </section>
    )
}

