'use client'

import TextEditor from "../TextEditor"
import References from "../../Small Pieces/References"
import ThumbnailUploader from "../../Small Pieces/ThumbnailUploader"
import { BlogPostSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { z } from "zod"
import Tags from "../../Small Pieces/Tags"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Button, Input, notification, Spin } from "antd"
import { uploadFile } from "@/lib/uploadfile"
import { saveBlog } from "@/lib/saveBlog"


export default function ArticlesBlog() {

    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)
    const { data } = useSelector((state: RootState) => state.user)
    const { back, replace } = useRouter()
    const form = useForm<z.infer<typeof BlogPostSchema>>({
        resolver: zodResolver(BlogPostSchema),
        defaultValues: {
            postedBy: `${data?.firstName} ${data?.lastName}`,
            created_at: new Date(),
            title: "",
            content: "",
            references: [],
            image: undefined,
            tags: [],
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
        // form.reset()
    }

    async function onSubmit(values: z.infer<typeof BlogPostSchema>) {
        try {
            setIsSaveLoading(true)
            let path = ''

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
                type: 'default'
            }
            // TODO: Make an HTTP request to create the post permanently
            const { state, msg } = await saveBlog(postData)

            if (state === 'success') {
                setIsSaveLoading(false)
                notification.success({ message: msg, showProgress: true, pauseOnHover: true })
                replace('/')
            } else {
                notification.error({ message: msg, showProgress: true, pauseOnHover: true })
            }


        }
        catch (error: any) {
            console.log(error)
        }
        finally {
            setIsSaveLoading(false)
        }
        //TODO: Redirect the user after creating the post
    }

    return (
        <section>
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

                                    <Input size="large" {...field} placeholder="Title of your blog" />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    {/* WYSIWYG editor */}
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
                    {/* Adding Citations for the Post */}
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
