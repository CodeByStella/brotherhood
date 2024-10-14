'use client'

import Image from "next/image"
import { CommentType } from "./CommentList";
import CommentForm from "./CommentForm";
import { MdOutlineReply } from "react-icons/md";
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from "react-icons/ai";
import Avatar from "./Avatar";
import { useState } from "react";
import { convertDate } from "@/utils";

interface CommentShowProps {
    commentId: number,
    comments: CommentType[]
}

export default function CommentShow({ commentId, comments }: CommentShowProps) {

    const [openReplyBox, setOpenReplyBox] = useState<boolean>(false)
    const [showComments, setShowComments] = useState<boolean>(true)
    // Again finding a single first comment from a list of all comments
    const mainComment = comments.find((c) => c.id === commentId);
    // If the first comment doesn't exist it means , there will no be other child comments
    if (!mainComment) {
        return null;
    }
    // Filter childrens of this first comment
    const children = comments.filter((c) => c.parentId === commentId);
    // Rendring all the children comments and childrens of these children comments
    const renderedChildren = children.map((child) => {
        return (
        <CommentShow key={child.id} commentId={child.id} comments={comments} />
        );
    });

    async function handleLike(){

    }

    async function handleDislike(){

    }

    return (
        <div className="bg-button rounded-md max-sm:pl-4 sm:pl-7 max-sm:pr-4 sm:pr-14 py-6 md:ml-10 mt-2 mb-1">
            <div className="flex items-start gap-6">
                {mainComment.user.avatar ? <Image
                src={mainComment.user.avatar || ""}
                alt="user image"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                /> : <Avatar />}
                <div className="flex-1 max-sm:space-y-1 sm:space-y-3">
                    <div className="flex flex-wrap items-center gap-4">
                        <p className="text-lg text-black font-medium font-palanquin ">
                            {mainComment.user.firstName}
                        </p>
                        <p className="text-sm text-stone-500"> {convertDate(mainComment.createdAt)} </p>
                        {mainComment.parent && <div className="flex items-center gap-2">
                            <MdOutlineReply className="w-5 h-5 text-black"/>
                            <p className="text-sm text-stone-500"> {mainComment.parent?.user.firstName} {mainComment.parent?.user.lastName} </p>
                        </div>}
                    </div>
                    <p className="text-sm text-stone-500 font-palanquin"> @ {mainComment.user.userName} </p>
                    <p className="text-sm text-gray-900 max-sm:pt-4 max-sm:-ml-10">{mainComment.content}</p>
                    <div className="flex items-center justify-between max-sm:pt-4 sm:mt-6 max-sm:-ml-10">
                        <button onClick={() => setOpenReplyBox((open) => !open)} className="text-sm text-blue-800 underline-offset-1">
                            {openReplyBox ? "Hide" : "Reply"}
                        </button>
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-2">
                                <button onClick={() => setShowComments((comment) => !comment)}>
                                    <AiOutlineComment className={`w-6 h-6 ${showComments && children.length > 0 ? "text-orangeRed" : "text-stone-600"}`} />
                                </button>
                                <p className="text-sm text-stone-600 font-semibold pt-1"> {mainComment.comments} </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={handleLike}>
                                    <AiOutlineLike className="w-6 h-6 text-stone-600" />
                                </button>
                                <p className="text-sm text-stone-600 font-semibold pt-1"> {mainComment.likes} </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={handleDislike}>
                                    <AiOutlineDislike className="w-6 h-6 mt-1.5 text-stone-600" />
                                </button>
                                <p className="text-sm text-stone-600 font-semibold pt-1"> {mainComment.dislikes} </p>
                            </div>
                        </div>
                    </div>
                    {openReplyBox && <CommentForm parentId={mainComment.parentId} blogCategoryId={mainComment.blogCategoryId} />}
                </div>
            </div>
            { showComments && children.length > 0 && <div className="sm:pl-4">
                {renderedChildren}
            </div>}
        </div>
    );
}