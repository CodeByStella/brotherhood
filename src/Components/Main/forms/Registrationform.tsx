"use client"

import { Registration_Sections } from "@/constants"
import Link from "next/link"
import { useState } from "react"
import Section1Form from "./Section1Form"
import Section2Form from "./Section2Form"
import Section3Form from "./Section3Form"


type SEX = "male" | "female" | undefined

export interface USER {
    firstName?: string,
    lastName?: string,
    userName?: string,
    nickName?: string,
    sex?: SEX,
    languagesSpoken?: string[],
    languagesWishToLearn?: string[],
    birthDate?: string | null,
    email?: string,
    telegramUsername?: string,
    phoneNumber?: string,
    facebookId?: string,
    instagramUsername?: string,
    vkId?: string,
    weChatId?: string,
    country?: string,
    state?: string,
    city?: string,
    password?: string,
    confirmPassword?: string,
    referalId?: string,
    avatar?: string,
}

export default function Registrationform() {

    const [userData, setUserData] = useState<USER>()
    const [filledSection, setFilledSection] = useState<number[]>([1])
    const [currentLySelected, setCurrentlySelected] = useState<number>(1)

    // function handleMoveNext(section_num: number) {
    //     setCurrentlySelected(section_num)
    //     setFilledSection((filledSections) => [...filledSections, section_num])
    // }

    return (
        <section id="main" className="md:mx-24 mt-16 mb-48 pt-6 pb-20 max-sm:px-7 sm:px-20 shadow-lg bg-white">
            <h3 className="max-sm:text-base sm:text-xl text-black text-center font-semibold"> Join the Brothers Community </h3>
            <div className=" flex justify-center">
                <p className="w-[230px] text-center text-sm leading-6 mt-3"> Becoming a Member is Just a Few Steps Away. Register Now </p>
            </div>
            <div className="flex items-center justify-center mt-8">
                {Registration_Sections.map((section_num) => {
                    return (
                        <div key={section_num} className="relative">
                            <button className={`w-9 h-9 mr-8 rounded-full ${filledSection.includes(section_num) ? "bg-navy text-white" : "bg-white shadow-md text-navy border border-gray-300"} text-base focus-visible:outline-none`}>
                                <p className="font-semibold"> {section_num} </p>
                            </button>
                            {Registration_Sections[Registration_Sections.length - 1] != section_num &&
                                <hr className="absolute top-4 left-9 right-0 border-t border-navy w-[35px]" />}
                        </div>
                    )
                })}
            </div>
            <div className="mt-14">
                {currentLySelected === 1 && <Section1Form userData={userData} setUserData={setUserData} setCurrentlySelected={setCurrentlySelected} setFilledSection={setFilledSection} />}
                {currentLySelected === 2 && <Section2Form userData={userData} setUserData={setUserData} setCurrentlySelected={setCurrentlySelected} setFilledSection={setFilledSection} />}
                {currentLySelected === 3 && <Section3Form userData={userData} setFilledSection={setFilledSection} setCurrentlySelected={setCurrentlySelected} />}
                <p className="flex justify-center text-base mt-10">
                    Already have an account ?
                    <Link href={"/sign-in"} className="text-navy pl-2 font-semibold"> Sign in </Link>
                </p>
            </div>
            <div className="flex ite justify-center mt-14">
                <div className="max-md:w-[320px] md:w-full max-sm:px-3 sm:px-5 py-3 bg-button flex items-center justify-center max-sm:text-sm text-base text-navy font-semibold rounded-md border-none focus-visible:outline-none">
                    <h4> * Mandatory to complete these fields </h4>
                </div>
            </div>
        </section>
    )
}
