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
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, Input, Spin } from "antd"

export default function VideoBlog() {

    const { data } = useSelector((state: RootState) => state.user)
    const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false)
    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)
    const { back, replace } = useRouter()

    const form = useForm<z.infer<typeof VideoBlogSchema>>({
        resolver: zodResolver(VideoBlogSchema),
        defaultValues: {
            postedBy: `${data?.firstName} ${data?.lastName}`,
            created_at: new Date(),
            title: "",
            content: "",
            references: [],
            image: undefined,
            tags: [],
            videoLink: "",
        },
    })

    // async function handlePreview() {
    //     const postData = form.getValues()
    //     setIsPreviewLoading(true)
    //     //TODO: Upadte this post id after creating the post. It's used for the url
    //     let postId = "1rssggetegb" // FAKE POST ID
    //     // TODO: MAke an HTTP request to upload the Post but with a status of "pending"
    //     try {

    //     }
    //     catch (error: any) {

    //     }
    //     finally {
    //         setIsPreviewLoading(false)
    //     }
    //     // Redirect the User to the Preview-post Page
    //     push(`/preview-post/${postId}`)
    // }
    function handleClearForm() {
        // refresh the page to clear the form. form.reset() doesn't work
        back()
    }
    async function onSubmit(values: z.infer<typeof VideoBlogSchema>) {
        // const postData = {
        //     postedBy: values.postedBy,
        //     created_at: values.created_at,
        //     description: values.description,
        //     title: values.title,
        //     videoLink: values.videoLink,
        //     references: values.references,
        //     thumbnail: values.thumbnail[0],
        //     tags: values.tags
        // }
        // setIsSaveLoading(false)
        // try {
        //     // TODO: Make an HTTP request to create the post permanently

        // }
        // catch (error: any) {

        // }
        // finally {
        //     setIsSaveLoading(false)
        // }
        // //TODO: Redirect the user after creating the post
    }

    return (
        <section className='mt-10'>
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

                                    <Input size="large" {...field} placeholder="https://www.youtube.com/tutorial" />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="mt-10 flex flex-col justify-start gap-5">
                                <FormLabel className="text-lg text-black font-medium">
                                    Description&nbsp; <span className="astrics" >*</span>
                                </FormLabel>
                                <FormControl>
                                    <TextEditor defaultValue={field.value} onChange={field.onChange}   /* fieldchange={field.onChange}  */ />
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
                                    <References fieldchange={field.onChange} />
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
                                    <ThumbnailUploader fieldchange={field.onChange} title="Featured Image" mediaUrl="./public/postImage.png" />
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
                                    <Tags fieldchange={field.onChange} title="Add tags to your Post" />

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
        </section>
    )
}
