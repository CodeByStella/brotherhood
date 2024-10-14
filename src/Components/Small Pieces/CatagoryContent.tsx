"use client"

import { useState } from "react"
import Pagination from "../Main/Pagination"
import { Checkbox } from "../ui/checkbox"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "../ui/select"
import { message, Spin } from "antd"

interface CatagoryTableProps {
    totalResults: number,
    contents: {
        id: number,
        type: string,
        name: string,
        publishedDate: string
    }[],
    postsNotSubmitted: string[],
    postsPending: string[]
}

export default function CatagoryContent({ totalResults, contents, postsNotSubmitted, postsPending }: CatagoryTableProps) {

    const [pendingSelected, setPendingSelected] = useState<string | null>(null)
    const [toBeSubmitted, setTobeSubmitted] = useState<string | null>(null)
    const [isRemoving, setIsRemoving] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


    function handleRemovePendingPost() {
        if (!pendingSelected) {
            message.error("Nothing was selected")
        }
        // TODO: Make an HTTP request to remove the post from catafory. the endpoint should recieve a parameter called title.
        setIsRemoving(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsRemoving(false)
        }
    }

    function handleSubmitCatagory() {
        console.log(toBeSubmitted)
    }

    return (
        <section className='my-6 sm:px-6'>
            <Table className="border border-gray-300">
                <TableHeader>
                    <TableRow className="text-base font-medium">
                        <TableHead className="max-sm:text-sm"> S/N </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Type </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Category </TableHead>
                        <TableHead className="text-center max-sm:text-sm"> Added date </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contents.map((element) => {
                        return (
                            <TableRow key={element.id}>
                                <TableCell className="border border-gray-300"> {element.id} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {element.type} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {element.name} </TableCell>
                                <TableCell className="border border-gray-300 text-center"> {element.publishedDate} </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="mt-5 mb-7">
                {/* TODO: Pass the number of results for the sapecific catagory */}
                <Pagination TotalNumberOfResults={totalResults} pageSize={4} />
            </div>
            <div className="max-sm:mt-16 sm:mt-8">
                <h3 className="text-black text-base font-semibold"> Submit to blog Category </h3>
                <Select onValueChange={(value) => setTobeSubmitted(value)}>
                    <SelectTrigger className="w-[250px] mt-7 bg-button px-3 py-2.5 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="-pl-5">
                        {postsNotSubmitted.map((postTitle) => {
                            return (
                                <SelectItem key={postTitle} value={postTitle} className="text-sm text-black font-palanquin"> {postTitle} </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
                <button className="bg-navy w-[100px] h-auto mt-7 border-none focus-visible:outline-none rounded-md px-6 py-2.5 text-sm text-white">
                    {isSubmitting ? <Spin spinning={isSubmitting} /> : "Submit"}
                </button>
            </div>
            <div className="mt-10">
                <h3 className="text-black max-sm:text-sm sm:text-base font-semibold"> List of pending category submissions </h3>
                <div className="mt-6 max-sm:w-[250px] sm:w-[350px] h-[200px] overflow-y-scroll overflow-x-hidden border border-gray-400 rounded-l-md focus-visible:outline-none focus:border-none max-sm:px-3 sm:px-6 pt-2 pb-4">
                    {/* All the posts that the user submitted to be included in the catagory, but they are in the pending state are placeed here. the user can remove them if he/she wants/  */}
                    {postsPending.map((postTitle) => {
                        return (
                            <div key={postTitle} className="flex items-start justify-between mr-6 mt-3.5">
                                <h4 className="text-sm text-black"> {postTitle} </h4>
                                <Checkbox checked={pendingSelected === postTitle} onClick={() => pendingSelected === postTitle ? setPendingSelected(null) : setPendingSelected(postTitle)} className="text-blue-600 rounded-sm" />
                            </div>
                        )
                    })}
                </div>
                <button onClick={handleRemovePendingPost} className="bg-navy w-[100px] h-auto mt-7 border-none focus-visible:outline-none rounded-md px-6 py-2.5 text-sm text-white"> {isRemoving ? <Spin spinning={isRemoving} /> : "Remove"} </button>
            </div>
        </section>
    )
}
