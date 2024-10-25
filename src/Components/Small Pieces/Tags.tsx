'use client'

import { Button, Input, message, Space } from "antd";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface TagsProps {
    fieldchange: (tags: string[]) => void;
    title: string,
    value: string[]
}

export default function Tags({ fieldchange, title, value: tags = [] }: TagsProps) {

    const [inputControlledValue, setInputControlledValue] = useState<string>("")

    function handleDeleteTag(tag: string) {
        // Remove the tag from the array of tags
        const newTags = tags.filter((element) => element !== tag)
        // Update the arrays
        // Update the form field
        fieldchange(newTags)
    }

    function handleAddTag() {
        // If there is no input provided
        if (!inputControlledValue) {
            message.error("No tag provided")
            return
        }
        // Check if tag already exists
        if (tags.includes(inputControlledValue)) {
            message.error("tag is already provided")
            return
        }
        // clear the input field
        setInputControlledValue("")
        // add the tag into the array
        // Update the form field. Data will be stale if we used tags state
        fieldchange([...tags, inputControlledValue])
    }

    return (
        <section className="mt-16">
            <h3 className="text-xl text-black font-semibold"> {title} </h3>
            <p className="mt-4 text-sm text-stone-700"> Add and edit tags (not more than 5) </p>
            <div className="flex items-center gap-4">
                {tags.length > 0 && tags.map((tag) => {
                    return (
                        <div key={tag} className="flex items-center gap-3 mt-4 bg-orangeRed rounded-xl px-4 py-2.5 focus-visible:outline">
                            <p className="text-sm text-white"> {tag} </p>
                            <button type="button" onClick={() => handleDeleteTag(tag)}>
                                <IoCloseOutline className="text-white w-4 h-4 hover:text-black" />
                            </button>
                        </div>
                    )
                })}
            </div>
            {tags.length !== 5 && <Space.Compact className="w-full mt-6">
                <Input type="text" onPressEnter={e => {
                    e.preventDefault()
                    handleAddTag()
                }} placeholder="Type and press enter" value={inputControlledValue} onChange={(e) => setInputControlledValue(e.target.value)} size="large" />
                <Button htmlType="button" type="primary" onClick={handleAddTag} size="large">
                    Add Tag
                </Button>
            </Space.Compact>
            }
        </section>
    )
}
