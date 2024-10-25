'use client'
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Pagination, Spin } from "antd";
import { getBlogCounts, getBlogs } from "@/lib/Blog";
import { Blog } from "@/constants";
import { useSearchParams } from "next/navigation";


interface PostListProps {
    type?: string
}

// TODO: Fetch the posts
export default function PostList({ type }: PostListProps) {
    const [pageSetting, setPageSetting] = useState({
        current: 1,
        size: 10,
    })
    const [total, setTotal] = useState(0)
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const userId = searchParams.get("id")
    useEffect(() => {
        getBlogCounts(userId || undefined, type).then(res => setTotal(res || 0))
    }, [])
    useEffect(() => {
        setLoading(true)
        getBlogs(pageSetting, userId || undefined, type).then(res => {
            console.log(res)
            setLoading(false)
            setData(res)

        })
    }, [pageSetting])


    const onDeleteBlog = (id: string) => {
        setData(data.filter(val => val.id !== id))
        setTotal(total - 1)
    }

    const Posts = data.map((post: Blog, i: number) => {
        return (
            <PostCard key={i} postedBy={post.postedBy} date={new Date(post.created_at ? post.created_at?.seconds * 1000 : 0)} title={post.title} description={post.content} tags={post.tags || []} likes={post.likes?.length || 0} comments={post.comments || 0} totalViews={post.totalViews || 0} isVideoPost={post.type === 'video'} uid={post.uid} id={post.id} video={post.video} image={post.image} onDelete={onDeleteBlog} />
        )
    })
    return (
        <main className="mt-10 xl:pr-10">
            <Pagination align="end" showQuickJumper showLessItems showSizeChanger current={pageSetting.current} total={total} pageSize={pageSetting.size} hideOnSinglePage onChange={(num, size) => setPageSetting({ current: num, size })} />
            <Spin spinning={loading} >

                {Posts}
            </Spin>
            {/*  Simulating an array of Posts fetched from the Database */}
            <Pagination className="mt-10" align="end" showQuickJumper showLessItems showSizeChanger current={pageSetting.current} total={total} pageSize={pageSetting.size} hideOnSinglePage onChange={(num, size) =>
                setPageSetting({ current: num, size })

            } />
        </main>
    )
}
