'use client'

import { urlcheck } from "@/lib/utils";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, message, Space } from "antd";
import Link from "next/link"
import { useState } from "react"

interface ReferencesProps {
    fieldchange: (references: string[]) => void;
    value: string[]
}

export default function References({ fieldchange, value: savedValue = [] }: ReferencesProps) {

    const [inputControlledValue, setInputControlledValue] = useState<string>("")

    async function handleAddNewReference() {
        if (!inputControlledValue) {
            message.error("No refrece added")
            return
        }
        if (savedValue.includes(inputControlledValue)) {
            message.error("Reference is already present")
            return
        }
        // Check if the reference is a link to Sanitize user Input
        const exist = await urlcheck(inputControlledValue)
        if (!exist) {
            message.error("URL is not exist")
            return
        }
        // Make sure the link is not already added

        setInputControlledValue("")
        // Update the field Value
        fieldchange([...savedValue, inputControlledValue])
    }
    const handleDeleteReference = (value: string) => {
        fieldchange(savedValue.filter(v => v !== value))
    }

    return (
        <section className='mt-10'>
            <h3 className="text-xl text-black font-semibold"> References </h3>
            <div className="mt-4">
                {savedValue.length > 0 && savedValue.map((reference, i) => {
                    return (
                        <div key={i} className="flex items-center gap-4 mt-3">
                            <p> {i + 1} . </p>
                            <Link href='#' className="text-blue-500 text-base"> {reference} </Link>
                            <DeleteOutlined onClick={() => handleDeleteReference(reference)} className="text-red-500" />
                        </div>
                    )
                })}
            </div>
            {savedValue.length !== 3 && <span className="flex flex-col items-start mt-10">

                <Space.Compact className="w-full" >

                    <Input value={inputControlledValue} onPressEnter={e => {
                        e.preventDefault()
                        handleAddNewReference()
                    }} size="large" onChange={(e) => setInputControlledValue(e.target.value)} placeholder="Add links for citation" />
                    <Button type="primary" size="large" onClick={handleAddNewReference} >
                        Add Citation
                    </Button>
                </Space.Compact>
            </span>}
        </section>
    )
}
