'use client'

import { AutoComplete, type Option } from "@/Components/ui/autocomplete"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { PAGES } from "@/constants"
import { CreateBlogCatagorySchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { CiCircleRemove } from "react-icons/ci";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Spin } from "antd"

export default function CreateBlogCatagoryForm() {

    const [parentCatagory2, setParentCatagory2] = useState<boolean>(false)
    const [parentCatagory3, setParentCatagory3] = useState<boolean>(false)
    const [value, setValue] = useState<Option>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // TODO: Fake page catagories data. make sure to replace it later
    const [pageOptions, setPageOptions] = useState<{ value: string, label: string }[]>(PAGES)
    const [catagories, setCatagories] = useState<{ value: string, label: string }[]>([])


    const form = useForm<z.infer<typeof CreateBlogCatagorySchema>>({
        resolver: zodResolver(CreateBlogCatagorySchema),
        defaultValues: {
            name: "",
            parentCatagoryCode1: "",
            parentCatagoryCode2: undefined,
            parentCatagoryCode3: undefined,
            description: "",
            catagories: []
        },
    })

    function handleAddRemoveParentCatagory() {
        if (parentCatagory2 && parentCatagory3) {
            setParentCatagory2(false)
            setParentCatagory3(false)
            // Make the optional paraent catagory codes empty
            form.resetField("parentCatagoryCode2", {
                defaultValue: ""
            })
            form.resetField("parentCatagoryCode3", {
                defaultValue: ""
            })
            return
        }
        parentCatagory2 ? setParentCatagory3(true) : setParentCatagory2(true)
    }

    function handleRemoveCatagory(catagory: { value: string, label: string }) {
        // remove the option from the catagories array
        const updatedList = catagories.filter((item) => item.value !== catagory.value)
        setCatagories(updatedList)
        // add the option to the list of options
        setPageOptions((options) => [...options, catagory])
    }

    function onSubmit(values: z.infer<typeof CreateBlogCatagorySchema>) {
        // Check if the catagories state is empty, which means the user didn't add the pages to the catagory.
        if (catagories.length === 0) {
            form.setError("catagories", {
                message: "No page has been added to the category"
            })
            return
        }
        const catagoryValues = catagories.map((catagory) => catagory.value)
        // set the field catagories with the value of the catagories state
        form.setValue("catagories", catagoryValues)
        // Update the form values to include the catagoryValues
        const updatedValues = { ...values, catagories: catagoryValues }
        //TODO: Make an HTTP request to add the pages to the catagories. 
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
        <section className='mt-16'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* CATAGORY NAME */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start gap-4">
                                <FormLabel className="text-base text-black font-semibold font-palanquin">
                                    Category name
                                    <span className="astrics"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={isLoading} placeholder="name of the category" className="max-sm:w-[200px] sm:w-[280px] px-3 py-2.5 bg-button border border-gray-400 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-black text-sm" {...field} />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    {/* PARENT CATAGORY CODE */}
                    <FormField
                        control={form.control}
                        name="parentCatagoryCode1"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start gap-4 mt-8">
                                <FormLabel className="text-base text-black font-semibold font-palanquin">
                                    Parent Category Code 1
                                    <span className="astrics"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <input type="text" disabled={isLoading} placeholder="Parent category code" className="max-sm:w-[200px] sm:w-[280px] px-3 py-2.5 bg-button border border-gray-400 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-black text-sm" {...field} />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    {parentCatagory2 && (
                        <FormField
                            control={form.control}
                            name="parentCatagoryCode2"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start gap-4 mt-8">
                                    <FormLabel className="text-base text-black font-semibold font-palanquin">
                                        Parent Category Code 2
                                    </FormLabel>
                                    <FormControl>
                                        <input type="text" disabled={isLoading} placeholder="Parent category code 2" className="max-sm:w-[200px] sm:w-[280px] px-3 py-2.5 bg-button border border-gray-400 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-black text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                    )}
                    {parentCatagory3 && (
                        <FormField
                            control={form.control}
                            name="parentCatagoryCode3"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-start gap-4 mt-8">
                                    <FormLabel className="text-base text-black font-semibold font-palanquin">
                                        Parent Category Code 3
                                    </FormLabel>
                                    <FormControl>
                                        <input type="text" disabled={isLoading} placeholder="Parent category code 3" className="w-[280px] px-3 py-2.5 bg-button border border-gray-400 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-black text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-sm text-red-500' />
                                </FormItem>
                            )}
                        />
                    )}
                    <button type="button" onClick={handleAddRemoveParentCatagory} className="max-sm:text-sm sm:text-[15px] text-black font-medium font-palanquin mt-5"> {parentCatagory3 ? "- Remove other parent categories" : "+ Add another Parent Category (optional)"} </button>
                    {/* DESCRIPTION */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start gap-4 mt-10">
                                <FormLabel className="text-base text-black font-semibold font-palanquin">
                                    Description
                                    <span className="astrics"> * </span>
                                </FormLabel>
                                <FormControl>
                                    <textarea disabled={isLoading} className="max-sm:w-[300px] sm:w-[340px] h-[180px] px-3 py-2.5 bg-button border border-gray-400 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-black text-sm" {...field} />
                                </FormControl>
                                <FormMessage className='text-sm text-red-500' />
                            </FormItem>
                        )}
                    />
                    <div className="flex max-sm:flex-col max-sm:items-start sm:items-center gap-7 mt-10">
                        <p className="text-base text-black font-semibold font-palanquin"> Add page to category </p>
                        <AutoComplete
                            options={pageOptions}
                            emptyMessage="No pages found"
                            placeholder="search pages"
                            isLoading={isLoading}
                            onValueChange={setValue}
                            disabled={isLoading}
                            setCatagories={setCatagories}
                            setPageOption={setPageOptions}
                            value={value}
                        />
                    </div>
                    <div className="max-sm:w-[300px] sm:w-[340px] h-[150px] overflow-y-scroll overflow-x-hidden border border-gray-400 rounded-md px-6 pb-6 pt-4 mt-10">
                        {catagories.length > 0 && catagories.map((catagory) => {
                            return (
                                <div key={catagory.value} className="mt-2 w-fit px-4 py-2 -z-30 flex items-center gap-3 bg-button">
                                    <p> {catagory.label} </p>
                                    <button type="button" onClick={() => handleRemoveCatagory(catagory)}>
                                        <CiCircleRemove className="w-5 h-5 text-blue-600" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    {form.formState.errors.catagories && <p className="text-sm text-red-500 my-3"> {form.formState.errors.catagories.message} </p>}
                    <button type="submit" className="bg-navy w-[100px] h-auto  mt-10 rounded-md text-base text-white px-6 py-2 focus-visible:outline-none">
                        {isLoading ? <Spin spinning={isLoading} /> : "Submit"}
                    </button>
                </form>
            </Form>
        </section>
    )
}
