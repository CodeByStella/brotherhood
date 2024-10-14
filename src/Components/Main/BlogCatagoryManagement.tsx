'use client'

import { BLOG_CATAGORY_APPROVAL_LIST } from "@/constants"
import { useState } from "react"
import { MdCancel } from "react-icons/md"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import ApproveReject from "../Small Pieces/ApproveReject"
import { message } from "antd"

type BlogCatagoryState = {
    deleteSelectCatagory: string,
    deletePageCode: string,
    selectParantCatagory: string,
    subCatagoryName: string,
    subCatagoryDescription: string,
    subCatagoryPages: string[],
    subCatagoryManagerUsername: string
}

const Initial_Value: BlogCatagoryState = {
    deleteSelectCatagory: "",
    deletePageCode: "",
    selectParantCatagory: "",
    subCatagoryName: "",
    subCatagoryDescription: "",
    subCatagoryPages: [],
    subCatagoryManagerUsername: ""
}

export default function BlogCatagoryManagement() {

    const [state, setState] = useState<BlogCatagoryState>(Initial_Value)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleApproveBlogCatagory(name: string | null) {
        if (!name) return
        // TODO: Make an HTTP request to the endpoint the approves this blog catagory
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleRejectBlogCatagory(name: string | null) {
        if (!name) return
        // TODO: Make an HTTP request to the endpoint the approves this blog catagory
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleDeleteBlogFromCatagory() {
        // Check if data exists
        if (!state.deleteSelectCatagory && !state.deletePageCode) {
            message.error("No data provided")
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to the endpoint that deletes the blog from a catagory
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    function handleAddPageToCategory(page: string) {
        // check if page is already included
        let tempData
        const pageExists = state.subCatagoryPages.includes(page)
        if (pageExists) {
            // remove the page from the array
            const filteredPages = state.subCatagoryPages.filter((value) => value !== page)
            tempData = { ...state, subCatagoryPages: filteredPages }
            setState(tempData)
        }
        else {
            // add the page to the array of pages
            tempData = { ...state, subCatagoryPages: [...state.subCatagoryPages, page] }
            // update the state
            setState(tempData)
        }
    }

    function handleRemovePageFromList(page: string) {
        const filteredArray = state.subCatagoryPages.filter((value) => value !== page)
        const tempData = { ...state, subCatagoryPages: filteredArray }
        setState(tempData)
    }

    async function handleCreateSubCategory() {
        // Check if All datas are provided excepts for pages because the user is not obliged to add pages into the sub category
        const allDataProvided = Boolean(state.selectParantCatagory) && Boolean(state.subCatagoryName) && Boolean(state.subCatagoryDescription) &&
            Boolean(state.subCatagoryManagerUsername)
        if (!allDataProvided) {
            message.error("Make sure to fill all fields")
            return
        }
        setIsLoading(true)
        //TODO: Make an HTTP request to create a new sub catagory
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
            {/* F7: APPROVE OR REJECT BLOG TO CATAGORY */}
            <div>
                <h3 className="text-base text-black font-semibold max-sm:leading-7"> F7: Approve or Reject Blog to Category </h3>
                {/* TODO: FAKE DATA */}
                <ApproveReject list={BLOG_CATAGORY_APPROVAL_LIST} handleApprove={handleApproveBlogCatagory} handleReject={handleRejectBlogCatagory} isLoading={isLoading} />
            </div>
            {/* F8: DELETE BLOG FROM CATAGORY */}
            <div className="max-sm:mt-14 sm:mt-10">
                <h3 className="text-base text-black font-semibold max-sm:leading-7"> F8: Delete blog from Category </h3>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-6">
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, deleteSelectCatagory: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[250px] bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {/* TODO: Loop over blog catagories that are approved */}
                        </SelectContent>
                    </Select>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, deletePageCode: e.target.value })} placeholder="Enter page code" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleDeleteBlogFromCatagory} className="bg-red-100 mt-8 w-[130px] h-auto px-4 py-3 rounded-md focus-visible:outline-emerald-50 text-sm text-black font-semibold font-palanquin">
                    Delete Blog
                </button>
            </div>
            {/* F9: CREATE NEW SUB CATAGORY */}
            <div className="mt-14">
                <h3 className="text-base text-black font-semibold"> F9: Create new sub category </h3>
                <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, selectParantCatagory: value })}>
                    <SelectTrigger className="max-sm:w-[150px] sm:w-[250px] mt-6 bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                        <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {/* TODO: Loop over blog catagories that are approved */}
                    </SelectContent>
                </Select>
                <p className="mt-7 text-base text-black font-palanquin"> Category name </p>
                <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, subCatagoryName: e.target.value })} placeholder="catergoy name" className="functionsInput mt-4" />
                <p className="mt-7 text-base text-black font-palanquin"> Description </p>
                <textarea disabled={isLoading} onChange={(e) => setState({ ...state, subCatagoryDescription: e.target.value })} className="max-sm:w-[290px] sm:w-[300px] h-[120px] mt-4 bg-button disabled:cursor-not-allowed border border-gray-400 rounded-l-md px-4 py-2.5 text-sm text-black focus-visible:outline-none" />
                <p className="mt-7 text-base text-black font-palanquin max-sm:leading-6"> Select pages to be included in the sub category </p>
                <div className="w-[260px] h-[250px] mt-6 border border-gray-400 overflow-y-scroll overflow-x-hidden rounded-md px-8 py-3 focus:outline-none">
                    {/* TODO: FAKE PAGES FOR NOW , ALL THE PAGES THAT THE USER HAS CREATED SHOULD BE PLACED HERE */}
                    {Array.from({ length: 6 }, (_, index) => index + 1).map((index) => {
                        return (
                            <div key={index} className="flex items-center max-md:gap-6 md:gap-8 mt-3">
                                <p> Page {index} </p>
                                <Checkbox checked={state.subCatagoryPages.includes(`page${index.toString()}`)} onClick={() => handleAddPageToCategory(`page${index.toString()}`)} className="w-5 h-5 rounded-[4px]" />
                            </div>
                        )
                    })}
                </div>
                <p className="mt-10 text-base text-black font-palanquin"> List of Selected pages</p>
                <div className="w-[250px] h-[150px] mt-6 border border-gray-400 overflow-y-scroll overflow-x-hidden rounded-l-md px-8 pb-3 pt-2 focus:outline-none">
                    {state.subCatagoryPages.length > 0 && state.subCatagoryPages.map((page) => {
                        return (
                            <button key={page} onClick={() => handleRemovePageFromList(page)} className="flex items-center gap-4 mt-4">
                                <p> {page} </p>
                                <MdCancel className="w-5 h-5 text-red-500" />
                            </button>
                        )
                    })}
                </div>
                <p className="mt-10 text-base text-black font-palanquin"> Manager username </p>
                <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, subCatagoryManagerUsername: e.target.value })} placeholder="Manager username" className="functionsInput mt-4" />
            </div>
            <button disabled={isLoading} onClick={handleCreateSubCategory} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                Create
            </button>
        </section>
    )
}
