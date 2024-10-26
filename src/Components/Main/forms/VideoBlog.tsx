'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { VideoBlogSchema } from "@/lib/validation"
import { RootState } from "@/redux/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { z } from "zod"
import TextEditor from "../TextEditor"
import References from "@/Components/Small Pieces/References"
import ThumbnailUploader from "@/Components/Small Pieces/ThumbnailUploader"
import Tags from "@/Components/Small Pieces/Tags"
import { useRouter, useSearchParams } from "next/navigation"
import React, { ChangeEvent, useEffect, useState } from "react"
import { Button, Input, notification, Spin } from "antd"
import { getEmbeddedVideoUrl } from "@/utils"
import { uploadFile } from "@/lib/uploadfile"
import { RenderVideo } from "@/Components/Small Pieces/RenderVideo"
import { getBlog, saveBlog } from "@/lib/Blog"
import { error, success } from "@/Components/ui/notification"
import { Blog } from "@/constants"




export default function VideoBlog() {

    const searchParams = useSearchParams()
    const blogId = searchParams.get("id")
    const { data } = useSelector((state: RootState) => state.user)
    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const [imagePath, setImagePath] = useState('')
    const [videoUrl, setVideoUrl] = useState<string>("");
    const { back, replace } = useRouter()

    const form = useForm<z.infer<typeof VideoBlogSchema>>({
        resolver: zodResolver(VideoBlogSchema),
        defaultValues: {
            postedBy: data?.nickName,
            created_at: new Date(),
            title: "",
            content: "",
            references: [],
            image: undefined,
            tags: [],
            videoLink: "",
        },
    })

    useEffect(() => {

        if (blogId) {
            setLoading(true)
            getBlog(blogId).then((res: any) => {
                console.log(res)
                setLoading(false)
                const resData = res as Blog
                setImagePath(resData.image || '')
                form.setValue('postedBy', resData.postedBy)
                form.setValue('title', resData.title)
                form.setValue('content', resData.content)
                form.setValue('references', resData.references)
                form.setValue('tags', resData.tags)
                form.setValue('videoLink', resData.video)
                setVideoUrl(resData.video)


            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
    }, [])

    function handleClearForm() {
        back()
    }
    async function onSubmit(values: z.infer<typeof VideoBlogSchema>) {
        try {
            setIsSaveLoading(true)
            let path = imagePath

            if (values.image) {
                path = await uploadFile(`image/${Date.now()}`, values.image)
            }


            const postData = {
                postedBy: values.postedBy,
                created_at: values.created_at,
                title: values.title,
                content: values.content,
                references: values.references,
                image: path,
                tags: values.tags,
                video: values.videoLink,
                type: 'video'
            }
            // TODO: Make an HTTP request to create the post permanently
            const { state, msg } = await saveBlog(postData)

            if (state === 'success') {
                setIsSaveLoading(false)
                success(msg)
                replace('/')
            } else {
                error(msg)
            }


        }
        catch (error: any) {
            console.log(error)
        }
        finally {
            setIsSaveLoading(false)
        }
    }

    return (
        <section className='mt-10'>
            <Spin spinning={loading} >

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* TITLE */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="block sm:flex items-center gap-10 mt-10">
                                    <FormLabel className="text-lg text-black font-medium flex">
                                        Title&nbsp; <span className="astrics" >*</span>
                                    </FormLabel>
                                    <FormControl>

                                        <Input size="large"  {...field} placeholder="Title of your blog" />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        {/* VIDEO LINK */}
                        <FormField
                            control={form.control}
                            name="videoLink"
                            render={({ field }) => (
                                <FormItem className="block sm:flex items-center gap-10 mt-10">
                                    <FormLabel className="text-lg whitespace-nowrap text-black font-medium flex">
                                        Video link&nbsp; <span className="astrics" >*</span>
                                    </FormLabel>
                                    <FormControl>

                                        <Input size="large" value={field.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(e.target.value)
                                            setVideoUrl(e.target.value)
                                        }} placeholder="https://www.youtube.com/tutorial" />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        {/* Description */}
                        <div className="w-full h-auto mt-5 flex justify-center">
                            <RenderVideo videoUrl={videoUrl} />
                        </div>

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="mt-10 flex flex-col justify-start gap-5">
                                    <FormLabel className="text-lg text-black font-medium">
                                        Description&nbsp; <span className="astrics" >*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <TextEditor value={field.value} onChange={field.onChange}   /* fieldchange={field.onChange}  */ />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        {/* REFERENCES */}
                        <FormField
                            control={form.control}
                            name="references"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <References value={field.value || []} fieldchange={field.onChange} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        {/* Uploading the Image */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ThumbnailUploader fieldchange={field.onChange} title="Featured Image" mediaUrl={imagePath} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        {/* Tags */}
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Tags value={field.value || []} fieldchange={field.onChange} title="Add tags to your Post" />

                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                        <div className="flex  gap-4  mt-14 float-end ">

                            {/* <Button size="large" type="default" loading={isPreviewLoading} className="border w-36  text-orangeRed border-orangeRed" onClick={handlePreview} >Preview Page</Button> */}
                            {/* <div className="flex gap-4  justify-between" > */}
                            <Button size="large" type="default" onClick={handleClearForm} className="border  w-36 text-navy border-navy">Cancel</Button>
                            <Button size="large" htmlType="submit" type="primary" className=" w-36" loading={isSaveLoading}    >Save</Button>

                            {/* </div> */}


                        </div>
                    </form>
                </Form>
            </Spin>
        </section>
    )
}
