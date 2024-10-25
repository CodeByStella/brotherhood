'use client'
import { getBio } from "@/lib/Bio"
import { RootState } from "@/redux/store"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export default function Bio() {

    const [bio, setBio] = useState('')
    const { data } = useSelector((state: RootState) => state.user)
    const searchParams = useSearchParams()
    const userId = searchParams.get("id")

    useEffect(() => {
        if (userId)
            getBio(userId).then(res => setBio(res))
    }, [data])


    const htmlStringBio = `<p> The bio of the <strong> user </strong> is rendered in Markdown and will be placed here. This section is dedicated to showcasing the user's <span style="color: red;"> personality </span> , skills, and experiences in a concise and visually appealing way. Whether you're a developer, designer, writer, or entrepreneur, this is your chance to tell your story and make a lasting impression on your audience </p>`
    return (
        <section className={`${bio ? '' : "bg-button"} border-none w-full h-auto max-sm:px-5 sm:px-10 py-6 `}>
            <div dangerouslySetInnerHTML={{ __html: bio ? bio : htmlStringBio }} ></div>
        </section>
    )
}
