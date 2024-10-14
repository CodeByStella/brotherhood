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
import { Spin } from "antd"

export default function VideoBlog() {

    const { data } = useSelector((state: RootState) => state.user)
    const [isPreviewLoading, setIsPreviewLoading] = useState<boolean>(false)
    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)
    const { refresh, push } = useRouter()

    const form = useForm<z.infer<typeof VideoBlogSchema>>({
        resolver: zodResolver(VideoBlogSchema),
        defaultValues: {
            description: "",
            references: [],
            title: "",
            thumbnail: [],
            videoLink: "",
            postedBy: `${data?.firstName} ${data?.lastName}`,
            tags: [],
            created_at: new Date()
        },
    })

    async function handlePreview() {
        const postData = form.getValues()
        setIsPreviewLoading(true)
        //TODO: Upadte this post id after creating the post. It's used for the url
        let postId = "1rssggetegb" // FAKE POST ID
        // TODO: MAke an HTTP request to upload the Post but with a status of "pending"
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsPreviewLoading(false)
        }
        // Redirect the User to the Preview-post Page
        push(`/preview-post/${postId}`)
    }
    function handleClearForm() {
        // refresh the page to clear the form. form.reset() doesn't work
        refresh()
    }
    async function onSubmit(values: z.infer<typeof VideoBlogSchema>) {
        const postData = {
            postedBy: values.postedBy,
            created_at: values.created_at,
            description: values.description,
            title: values.title,
            videoLink: values.videoLink,
            references: values.references,
            thumbnail: values.thumbnail[0],
            tags: values.tags
        }
        setIsSaveLoading(false)
        try {
            // TODO: Make an HTTP request to create the post permanently

        }
        catch (error: any) {

        }
        finally {
            setIsSaveLoading(false)
        }
        //TODO: Redirect the user after creating the post
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
                            <FormItem className="flex flex-wrap items-center max-sm:gap-4 sm:gap-10">
                                <FormLabel className="text-lg text-black font-medium">
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <input type="text" placeholder="Title of your blog" {...field} className="max-sm:w-[250px] sm:max-sm:w-[280px] sm:w-[300px] md:w-[350px] lg:w-[380px] px-3 py-2 border border-gray-400 focus-visible:outline-none rounded-md bg-button" />
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
                            <FormItem className="flex flex-wrap items-center max-sm:gap-3 sm:gap-6 mt-10">
                                <FormLabel className="text-lg text-black pt-3 font-medium">
                                    Enter video link
                                </FormLabel>
                                <FormControl>
                                    <input type="text" placeholder="https://www.youtube.com/tutorial" {...field} className="max-sm:w-[250px] sm:w-[300px] md:w-[350px] lg:w-[380px] px-3 py-2 border border-gray-400 focus-visible:outline-none rounded-md bg-button" />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mt-14 flex flex-col justify-start gap-3">
                                <FormLabel className="text-lg text-black font-medium">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <TextEditor fieldchange={field.onChange} />
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
                            <FormItem className="mt-14">
                                <FormControl>
                                    <References fieldchange={field.onChange} />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem className="mt-14">
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
                            <FormItem className="mt-10">
                                <FormControl>
                                    <Tags fieldchange={field.onChange} title="Add tags to your Post" />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-wrap items-center gap-16 mt-16">
                        <button type="button" onClick={handlePreview} className="border border-orangeRed w-[180px] h-auto max-sm:text-sm sm:text-base text-orangeRed font-semibold px-4 py-2 rounded-md focus-visible:outline-none" >
                            {isPreviewLoading ? <Spin spinning={isPreviewLoading} /> : "Preview Page"}
                        </button>
                        <div className="flex items-center gap-6">
                            <button type="button" onClick={handleClearForm} className="border border-navy text-navy max-sm:text-sm sm:text-base font-semibold px-4 py-2 rounded-md focus-visible:outline-none">
                                Cancel
                            </button>
                            <button type="submit" className="bg-navy w-[100px] h-auto max-sm:text-sm sm:text-base text-white font-semibold px-4 py-2 rounded-md focus-visible:outline-none">
                                {isSaveLoading ? <Spin spinning={isSaveLoading} /> : "Save"}
                            </button>
                        </div>
                    </div>
                </form>
            </Form>
        </section>
    )
}
