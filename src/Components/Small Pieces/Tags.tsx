'use client'

import { message } from "antd";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface TagsProps {
    fieldchange: (tags: string[]) => void;
    title: string,
}

export default function Tags({ fieldchange, title }: TagsProps) {

    const [tags, setAddTags] = useState<string[]>([])
    const [inputControlledValue, setInputControlledValue] = useState<string>("")

    function handleDeleteTag(tag: string) {
        // Remove the tag from the array of tags
        const newTags = tags.filter((element) => element !== tag)
        // Update the arrays
        setAddTags(newTags)
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
        setAddTags((allTags) => [...allTags, inputControlledValue])
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
            {tags.length !== 5 && <div className="flex flex-col justify-start gap-5 mt-10">
                <input type="text" placeholder="add tags here" value={inputControlledValue} onChange={(e) => setInputControlledValue(e.target.value)} className="w-[250px] rounded-md border border-gray-300 bg-button px-6 py-2.5 focus-visible:outline-none" />
                <button type="button" onClick={handleAddTag} className="mt-5 w-[150px] bg-navy rounded-md px-3 py-2 text-white max-sm:text-sm sm:text-base">
                    Add Tag
                </button>
            </div>}
        </section>
    )
}
