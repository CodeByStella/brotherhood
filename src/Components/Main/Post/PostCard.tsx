"use client"

import Image from "next/image";
import postImage from "../../../../public/postImage.png"
import VideoImage from "../../../../public/videoImage.jpg"
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PROFILE_PAGE_PATH } from "@/constants";
import { formatNumber } from "@/utils";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import { formatDistanceToNow } from 'date-fns'
import { Button, Typography, Tag, Tooltip, Popconfirm, Modal } from "antd";
import { EditOutlined, DeleteOutlined, LikeOutlined, CommentOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { PlayCircle } from "lucide-react";
import { deleteBlog } from "@/lib/Blog";
import { error, success } from "@/Components/ui/notification";
const { htmlToText } = require('html-to-text')

interface PostCardProps {
    id: string,
    image?: string,
    references?: string[],
    uid: string,
    postedBy: string,
    date: Date,
    title: string,
    description: string,
    tags: string[],
    likes: number,
    comments: number
    totalViews: number
    isVideoPost?: boolean,
    video?: string,
    onDelete: (id: string) => void

}
const colors = ['blue', 'cyan', 'green', 'magenta', 'purple', 'red', 'orange', 'gold', 'lime', 'geekblue']
// Data about the post is fetched deom the database later. for now it is static

export default function PostCard({ image, id, uid, postedBy, date, title, description, tags, likes, comments, totalViews, isVideoPost = false, video, onDelete }: PostCardProps) {

    const { isAuthenticated, data } = useSelector((state: RootState) => state.user)
    const searchParams = useSearchParams()
    const userId = searchParams.get("id")
    const isProfilePage = isAuthenticated && data && userId === data.uid
    const viewCount = formatNumber(totalViews)

    const { replace } = useRouter()


    const handleDelete = async () => {
        const { state, msg } = await deleteBlog(id)
        if (state === 'success') success(msg)
        else error(msg)
        onDelete(id)
    }
    const handleEdit = () => {
        if (isVideoPost) {
            replace(`/create-video-blog?id=${id}`)
        } else {
            replace(`/create-post?id=${id}`)
        }
    }



    return (
        <div className="border mt-4 max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-3xl hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="md:flex">
                <div className="md:shrink-0 relative">
                    <Image
                        className="h-48 w-full object-cover md:h-full md:w-48  "
                        src={image ? image : isVideoPost ? VideoImage : postImage}
                        alt="Blog post thumbnail"
                        width={200}
                        height={200}
                    />
                    {isVideoPost && <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40  opacity-100 transition-opacity duration-300">
                        <PlayCircle className="w-16 h-16 text-white opacity-80" />
                    </div>}
                </div>
                <div className="p-8 w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="block mt-1 text-lg leading-tight font-medium text-black ">{title}</p>
                            <p className="mt-2 text-slate-500 text-sm">By <strong className="hover:underline cursor-pointer" onClick={() => replace(`/profile?id=${uid}`)} >{postedBy}</strong> · {formatDistanceToNow(date, { addSuffix: true })}</p>
                        </div>
                        {isProfilePage && <div className="flex space-x-2">
                            <Tooltip title="Edit">
                                <Button icon={<EditOutlined />} onClick={handleEdit} size="small" />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <Popconfirm title='Are you sure you want to delete this item?' onConfirm={handleDelete} okText='Yes,delete it' cancelText='No' placement='topRight' okButtonProps={{ className: 'bg-red-500' }} >

                                    <Button icon={<DeleteOutlined />} size="small" danger />
                                </Popconfirm>
                            </Tooltip>
                        </div>}

                    </div>

                    <Typography.Paragraph className="mt-2 text-slate-500 text-wrap whitespace-break-spaces" ellipsis={{ rows: 3 }} >
                        {htmlToText(description).replace(/(\r\n|\n|\r)/gm, " ")}

                    </Typography.Paragraph  >
                    <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag, i) => {
                            return (
                                <Tag color={colors[i]} key={i}>{tag}</Tag>
                            )
                        })}

                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex space-x-4">
                            <Tooltip title="Comments">
                                <span className="flex items-center text-sm text-gray-500">
                                    <CommentOutlined className="mr-1" />
                                    {comments}
                                </span>
                            </Tooltip>
                            <Tooltip title="Likes">
                                <span className="flex items-center text-sm text-gray-500">
                                    <LikeOutlined className="mr-1" />
                                    {likes}
                                </span>
                            </Tooltip>

                            <Tooltip title="Views">
                                <span className="flex items-center text-sm text-gray-500">
                                    <EyeOutlined className="mr-1" />
                                    {viewCount}
                                </span>
                            </Tooltip>
                        </div>
                        <Link href={`/view-post/${id}`} >
                            <Button type="primary" size="small">
                                Continue reading
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
