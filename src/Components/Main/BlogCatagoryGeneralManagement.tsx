'use client'

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Pagination from "./Pagination";
import { message } from "antd";

interface Props {
    blogCatagoryLists: {
        id: number,
        catagory: string,
        catagoryCode: string,
        description: string
    }[]
}

export default function BlogCatagoryGeneralManagement({ blogCatagoryLists }: Props) {

    const [managerUsername, setManagerUsername] = useState<string>("")
    const [catagoryCode, setCatagoryCode] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleApproveBlogCatagory(blogCatagoryName: string) {
        //TODO: Make an HTTP request to approve this specific blog post
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleRejectBlogCatagory(blogCatagoryName: string) {
        //TODO: Make an HTTP request to approve this specific blog post
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleAssignManager() {
        // check if data is provided
        if (!managerUsername && !catagoryCode) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to assign a manager to this blog catagory
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleRemoveManager() {
        // check if data is provided
        if (!managerUsername && !catagoryCode) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to remove the manager of this blog catagory
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
        <section>
            {/* F5: APPROVE AND DELETE BLOG CATAGORY */}
            <div>
                <h3 className="text-base text-black font-semibold max-sm:leading-7"> F5: Approve and Delete Blog Category </h3>
                {/* TABLE */}
                <div className="mt-7">
                    <Table className="border border-gray-300">
                        <TableHeader>
                            <TableRow className="max-sm:text-sm sm:text-base font-medium">
                                <TableHead> S/N </TableHead>
                                <TableHead className="text-center"> Category </TableHead>
                                <TableHead className="text-center"> Category Code </TableHead>
                                <TableHead className="text-center"> Description </TableHead>
                                <TableHead className="text-right w-[150px]"> Function </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogCatagoryLists.map((element) => {
                                return (
                                    <TableRow key={element.id}>
                                        <TableCell className="font-medium border border-gray-300"> {element.id} </TableCell>
                                        <TableCell className="border border-gray-300"> {element.catagory} </TableCell>
                                        <TableCell className="border border-gray-300"> {element.catagoryCode} </TableCell>
                                        <TableCell className="border border-gray-300"> {element.description} </TableCell>
                                        <TableCell className="border border-gray-300 text-center">
                                            <div className="flex flex-col items-start gap-3">
                                                <button disabled={isLoading} onClick={() => handleApproveBlogCatagory(element.catagory)} className="bg-navy w-[80px] h-auto disabled:cursor-not-allowed p-2 text-sm text-white rounded-md focus-visible:outline-none">
                                                    Accept
                                                </button>
                                                <button disabled={isLoading} onClick={() => handleRejectBlogCatagory(element.catagory)} className="border border-navy disabled:cursor-not-allowed w-[80px] h-auto p-2 rounded-md focus-visible:outline-none text-sm text-navy">
                                                    Reject
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <Pagination TotalNumberOfResults={20} pageSize={4} />
                </div>
            </div>
            {/* F6: ASSIGN AND REMOVE BLOG CATAGORY MANGER */}
            <div className="max-sm:mt-14 sm:mt-7">
                <h3 className="text-base text-black font-semibold max-sm:leading-7"> F6: Assign and Remove Blog Category Manager</h3>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Assign Manager </p>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-6">
                    <input type="text" disabled={isLoading} onChange={(e) => setManagerUsername(e.target.value)} placeholder="Enter username" className="functionsInput" />
                    <input type="text" disabled={isLoading} onChange={(e) => setCatagoryCode(e.target.value)} placeholder="Enter category code" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleAssignManager} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Assign
                </button>
                <p className="mt-7 text-base text-black font-semibold font-palanquin"> Remove Manager </p>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-6">
                    <input type="text" disabled={isLoading} placeholder="Enter username" className="functionsInput" />
                    <input type="text" disabled={isLoading} placeholder="Enter category code" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleRemoveManager} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Remove
                </button>
            </div>
        </section>
    )
}
