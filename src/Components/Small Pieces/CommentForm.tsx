'use client'

import { useState } from "react"
import Avatar from "./Avatar"
import { message } from "antd"

interface CommentProps {
    parentId: number | null,
    blogCategoryId: number
}

export default function CommentForm({ parentId, blogCategoryId }: CommentProps) {

    const [commentInput, setCommentInput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleSubmit() {
        if (!commentInput) {
            message.error("No comment provided")
            return
        }
        if (!blogCategoryId) return
        //TODO: Make an HTTP request to add the comment to the blog category if there is no parentId. which means the user didn't replied to anyone , they just posted a comment to the blog category. If the comment has a parent id , that means it was reply to another person's comment
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='flex flex-col items-start gap-6 pt-7 pb-4'>
            <form onSubmit={handleSubmit} className="flex justify-start max-sm:gap-2 sm:gap-5">
                <span className="max-sm:hidden">
                    <Avatar />
                </span>
                <div className="flex flex-col items-start">
                    <textarea disabled={isLoading} onChange={(e) => setCommentInput(e.target.value)} placeholder="write a comment" className="bg-button rounded-md border border-gray-400 max-sm:w-[210px] max-sm:h-[140px] sm:w-[280px] sm:h-[140px] md:w-[400px] md:h-[140px] p-4 focus:outline-none disabled:cursor-not-allowed" />
                    <button type="submit" disabled={isLoading} className="bg-orangeRed mt-6 text-base text-white rounded-md focus-visible:outline-none px-4 py-2 disabled:cursor-not-allowed"> Comment </button>
                </div>
            </form>
        </section>
    )
}
