'use client'

import { useEffect, useState } from "react"
import { Avatar, Button, Drawer, message, notification, Timeline } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { SendOutlined, UserOutlined } from "@ant-design/icons"
import { getComments, sendComment } from "@/lib/Blog"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"
import { error, success } from "../ui/notification"

interface CommentProps {
    blogId: string,
    onChange: (val: number) => void
    onClose: (value: boolean) => void
}

export default function CommentForm({ blogId, onClose, onChange }: CommentProps) {

    const [commentInput, setCommentInput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { data } = useSelector((state: RootState) => state.user)
    const [isSaving, setIsSaving] = useState(false)
    const [commentsData, setCommentsData] = useState<any[]>([])
    const { replace } = useRouter()

    async function handleSend() {
        if (!commentInput) {
            message.error("No comment provided")
            return
        }
        if (!blogId) return
        setIsSaving(true)
        try {
            const { state, msg } = await sendComment(blogId, commentInput)
            if (state === 'success')
                success(msg)
            else error(msg)
            setCommentsData([{
                comment: commentInput,
                blogId,
                createdAt: {
                    seconds: Math.floor(Date.now() / 1000)
                },
                userId: data?.uid,
                user: {
                    userId: data?.uid,
                    avatar: data?.avatar,
                    nickName: data?.nickName
                }
            }, ...commentsData])
            onChange(commentsData.length + 1)
        }
        catch (error: any) {

        }
        finally {
            setIsSaving(false)
            setCommentInput('')
        }
    }
    useEffect(() => {
        if (blogId) {
            setIsLoading(true)
            getComments(blogId).then(res => {
                console.log(res)
                setIsLoading(false)
                setCommentsData(res || [])
            }).catch(err => {
                setIsLoading(false)
            })
        }

    }, [])

    return (
        <Drawer
            closable
            destroyOnClose
            title={<p>Comments({commentsData.length})</p>}
            placement="right"
            open
            loading={isLoading}
            onClose={() => onClose(false)}
        >



            <Timeline
                items={[
                    {
                        dot: <Avatar
                            className="bg-navy cursor-pointer  border-green-500  border-2 "
                            size={36}
                            icon={<UserOutlined />}
                            src={data?.avatar}
                            onClick={() => replace(`/profile?id=${data?.uid}`)}
                        />,
                        children: <div className="flex flex-col items-start w-full">
                            <textarea autoFocus disabled={isSaving} onChange={(e) => setCommentInput(e.target.value)} value={commentInput} placeholder="Write a comment here" className="w-full h-auto  focus:outline-none " rows={3} />
                            <Button htmlType="submit" className='w-full' loading={isSaving} onClick={handleSend} type="primary"   >Add comment <SendOutlined /></Button>
                        </div>,
                    },
                    ...commentsData.map(val => {
                        return {
                            dot: <Avatar
                                className="bg-navy cursor-pointer border-green-500  border-2 "
                                size={36}
                                icon={<UserOutlined />}
                                src={val.user?.avatar}
                                onClick={() => replace(`/profile?id=${val?.userId}`)}
                            />,
                            children: <div className=" whitespace-pre-wrap">
                                <div>
                                    <p className="mt-2 text-slate-500 text-sm">By <strong className="hover:underline cursor-pointer" onClick={() => replace(`/profile?id=${val?.userId}`)}>{val.user.nickName}</strong> · {formatDistanceToNow(new Date(val.createdAt.seconds * 1000), { addSuffix: true })}</p>
                                </div>
                                {val.comment}
                            </div>
                        }
                    })

                ]}
            />
        </Drawer>

    )
}
