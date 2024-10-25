'use client'

import Image from "next/image"
import PostHeader from "../../../../public/blogPostHeader.jpg"
import PostFooter from "@/Components/Small Pieces/PostFooter"
import { formatNumber } from "@/utils"
import Link from "next/link"
import CommentForm from "@/Components/Small Pieces/CommentForm"
import TopPageHeader from "@/Components/Small Pieces/TopPageHeader"
import { useEffect, useState } from "react"
import { getBlog, like } from "@/lib/Blog"
import { Blog } from "@/constants"
import { Avatar, Button, Spin, Tag, Tooltip } from "antd"
import { CommentOutlined, EyeFilled, EyeOutlined, LikeFilled, UserOutlined } from "@ant-design/icons"
import { formatDistanceToNow } from "date-fns"
import { RenderVideo } from "@/Components/Small Pieces/RenderVideo"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { HappyProvider } from '@ant-design/happy-work-theme'
import { useRouter } from "next/navigation"

interface Props {
    params: {
        id: string
    }
}
interface BlogType extends Blog { avatar: string }

//NOTE: Since This is a Preview Page the actions (like, comment) should not work. it's only for showing how it might look like.
const colors = ['blue', 'cyan', 'green', 'magenta', 'purple', 'red', 'orange', 'gold', 'lime', 'geekblue']


export default function page({ params }: Props) {
    const postId = params.id
    // TODO: Fetch the post by id
    // FAKE DATA
    const { replace } = useRouter()
    const [Blogdata, setData] = useState<BlogType>()
    const [loading, setLoading] = useState(false)
    const { data } = useSelector((state: RootState) => state.user)
    const [commentVisible, setCommentVisible] = useState(false)
    useEffect(() => {
        setLoading(true)
        if (postId) {
            getBlog(postId).then((res: any) => {
                setLoading(false)
                setData(res as BlogType)
            })
        }
    }, [])

    const handleLike = async () => {
        if (data && Blogdata && !Blogdata?.likes?.includes(data.uid)) {

            setData({ ...Blogdata, likes: Blogdata.likes ? [...Blogdata.likes, data?.uid || ''] : [data?.uid || ''] })
            const { state } = await like(postId)
        }

    }


    return (
        <main className="max-md:px-5 md:px-7 xl:px-20 mb-28">
            <TopPageHeader pageCode="PG32" pageName="Post view page" pageDescription="Here you can view post" />
            <Spin spinning={loading} >
                {Blogdata ? <>
                    <div className="mt-20 flex items-center gap-6">
                        <Avatar
                            className="bg-navy"
                            size={72}
                            icon={<UserOutlined />}
                            src={Blogdata?.avatar}
                            onClick={() => replace(`/profile?id=${Blogdata.uid}`)}
                        />
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg text-black font-medium"> By <b onClick={() => replace(`/profile?id=${Blogdata.uid}`)} className=" hover:underline cursor-pointer ">Markus Ray</b> </h3>
                            <p className="text-stone-500 text-sm"> {formatDistanceToNow(new Date(Blogdata?.created_at.seconds * 1000), { addSuffix: true })}</p>
                        </div>
                    </div>
                    <h2 className="mt-10 pl-3 text-3xl text-black font-semibold text-center "> {Blogdata.title} </h2>
                    {/* To prevent content shifting */}
                    {Blogdata.image && <div className="max-w-[80%] mt-8 mx-auto">
                        <Image src={Blogdata.image} alt="blog-post-header" width={700} height={100} className=" rounded-2xl  m-auto" />
                    </div>}
                    {Blogdata.video && <div className="mt-8 flex justify-center" ><RenderVideo videoUrl={Blogdata.video} /></div>}
                    <div className="mt-12" style={{
                        overflowWrap: "break-word"
                    }} >
                        {/* DUMMY HTML STRING */}
                        <span dangerouslySetInnerHTML={{ __html: Blogdata.content }} />
                    </div>
                    {Blogdata.references?.length ? <div className="mt-24">
                        <h2 className="text-xl text-black font-semibold"> Refrences </h2>
                        <div className="flex flex-col max-w-full justify-start gap-4 mt-4" style={{
                            overflowWrap: 'break-word'
                        }} >
                            {Blogdata.references?.map((citation, i) => {
                                return (
                                    <span key={citation} className="flex items-center gap-2 max-w-[350px] text-base text-black hover:text-blue-500">
                                        <p> {i + 1} </p>
                                        <Link href={citation} key={i} target="_blank"> {citation} </Link>
                                    </span>
                                )
                            })}
                        </div>
                    </div> : <></>}
                    <div className="mt-14 flex flex-wrap gap-4 justify-between" >
                        <div className=" flex flex-wrap gap-2">
                            {Blogdata.tags?.map((tag, i) => {
                                return (
                                    <Tag color={colors[i]} className="p-2" key={i}>{tag}</Tag>
                                )
                            })}

                        </div>
                        <div>
                            <div className="flex space-x-6 text-xl">
                                <Tooltip title="Views">
                                    <Button size="large" className="flex items-center  border-none p-0 m-0 text-base">
                                        <span className="flex items-center ">
                                            <EyeOutlined className="mr-1 w-6 h-6 text-green-500 font-semibold " />
                                            {formatNumber(Blogdata.totalViews || 0)}
                                        </span></Button>
                                </Tooltip>
                                <Tooltip title="Comments">
                                    <Button size="large" className="flex items-center  border-none p-0 m-0 text-base">
                                        <span className="flex items-center " >
                                            <CommentOutlined onClick={() => setCommentVisible(true)} className="mr-1 w-5 h-5 text-indigo-500 font-semibold  cursor-pointer hover:scale-110 transition-all hover:shadow-lg " />
                                            {Blogdata.comments || 0}
                                        </span></Button>
                                </Tooltip>
                                <HappyProvider   >
                                    <Tooltip title="Likes">
                                        <Button size="large" onClick={handleLike} className="flex items-center  border-none p-0 m-0 text-base">
                                            <LikeFilled className="mr-1 w-5 h-5 text-red-500 font-semibold " />

                                            {Blogdata.likes?.length || 0}
                                        </Button>
                                    </Tooltip>
                                </HappyProvider>


                            </div>
                        </div>
                    </div>




                    {/* TODO: FIX THIS LATER */}
                    {commentVisible && <CommentForm
                        blogId={Blogdata.id}
                        onChange={val => setData({ ...Blogdata, comments: val })}
                        onClose={setCommentVisible}
                    />}


                </> : <div className="h-96" > </div>}
            </Spin>
        </main>
    )
}
