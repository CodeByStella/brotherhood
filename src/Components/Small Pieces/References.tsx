'use client'

import { HTTPS, HTTP } from "@/constants"
import { message } from "antd";
import Link from "next/link"
import { useState } from "react"

interface ReferencesProps {
    fieldchange: (references: string[]) => void;
}

export default function References({ fieldchange }: ReferencesProps) {

    const [references, setAddReferences] = useState<string[]>([])
    const [inputControlledValue, setInputControlledValue] = useState<string>("")

    function handleAddNewReference() {
        if (!inputControlledValue) {
            message.error("No refrece added")
            return
        }
        // Check if the reference is a link to Sanitize user Input
        if (!inputControlledValue.startsWith(HTTPS || HTTP)) {
            message.error("Make sure the refrence is link ")
            return
        }
        // Make sure the link is not already added
        if (references.includes(inputControlledValue)) {
            message.error("reference is already present")
            return
        }
        setInputControlledValue("")
        setAddReferences((addedReferences) => [...addedReferences, inputControlledValue])
        // Update the field Value
        fieldchange([...references, inputControlledValue])
    }

    return (
        <section className='mt-10'>
            <h3 className="text-2xl text-black font-semibold"> References </h3>
            <div className="mt-4">
                {references.length > 0 && references.map((reference, i) => {
                    return (
                        <div key={i} className="flex items-center gap-2 mt-3">
                            <p> {i + 1} </p>
                            <Link href={reference} className="hover:text-blue-500 text-base"> {reference} </Link>
                        </div>
                    )
                })}
            </div>
            {references.length !== 3 && <span className="flex flex-col items-start mt-10">
                <input value={inputControlledValue} onChange={(e) => setInputControlledValue(e.target.value)} type="text" placeholder="Add links for citation" className="max-sm:w-[280px] sm:w-[300px] md:w-[350px] lg:w-[380px] border border-gray-400 px-4 py-2.5 bg-button focus-visible:outline-none rounded-md" />
                <button type="button" onClick={handleAddNewReference} className="bg-navy rounded-md w-[150px] focus-visible:outline-none max-sm:text-sm sm:text-base text-white px-4 py-2 mt-8">
                    Add Citation
                </button>
            </span>}
        </section>
    )
}
