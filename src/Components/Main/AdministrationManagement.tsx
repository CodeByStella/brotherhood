'use client'

import { Checkbox } from "@/Components/ui/checkbox"
import FeaturedImage from "./../../../public/blogPostHeader.jpg"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/Components/ui/select"
import { useEffect, useState } from "react"
import Image from "next/image"
import { message } from "antd"

type Functions = {
    createDepartmentName: string,
    createManagerName: string,
    editSelectDepartment: string,
    editNewManagerUsername: string,
    editNewDepartmentName: string,
    assignUsername: string,
    assignSelectManager: string,
    removeSelectManager: string,
    removeUsername: string,
    authoritySelectUsername: string,
    authoritySelectFunction: string
    authorityRemoveFunction: string,
    authorityRemoveUsername: string,
    heroPageCode: string,
    heroCaption: string,
    heroRemovePage: string
}

const InitialValue = {
    createDepartmentName: "",
    createManagerName: "",
    editSelectDepartment: "",
    editNewManagerUsername: "",
    editNewDepartmentName: "",
    assignUsername: "",
    assignSelectManager: "",
    removeSelectManager: "",
    removeUsername: "",
    authoritySelectUsername: "",
    authoritySelectFunction: "",
    authorityRemoveFunction: "",
    authorityRemoveUsername: "",
    heroPageCode: "",
    heroCaption: "",
    heroRemovePage: ""
}

export default function AdministrationManagement() {

    const [state, setState] = useState<Functions>(InitialValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        //TODO: fetch the featured image of the blog post with this pagecode
    }, [state.heroPageCode])

    async function handleCreateDepartment() {
        // Check if the data is provided
        if (!state.createDepartmentName && !state.createManagerName) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to the endpoint that creates the department
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }
    async function handleUpdateDepartment() {
        // Check if the data is provided
        if (!state.editNewDepartmentName && !state.editSelectDepartment && !state.editNewManagerUsername) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to the endpoint that updates the department
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
        // Check if the data is provided
        if (!state.assignSelectManager && !state.assignUsername) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to the endpoint that assigns a manager
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
        // Check if the data is provided
        if (!state.removeSelectManager && !state.removeUsername) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to the endpoint that removes a manager
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }
    async function handleAssignFunctionAuthority() {
        // Check if the data is provided
        if (!state.authoritySelectFunction && !state.authoritySelectUsername) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to the endpoint that assigns a specific function authority
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }
    async function handleRemoveFunctionAuthority() {
        // Check if the data is provided
        if (!state.authorityRemoveFunction && !state.authorityRemoveUsername) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to the endpoint that removes a specific function authority
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }
    async function handleRemoveHeroSectionPage() {
        // Check if the data is provided
        if (!state.heroRemovePage) {
            message.error("No page is selected")
            return
        }
        //TODO: Make an HTTP request to the endpoint that removes hero section page
        setIsLoading(true)
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }
    async function handleHeroAddPage() {
        // Check if the data is provided
        if (!state.heroPageCode && !state.heroCaption) {
            message.error("No data provided")
            return
        }
        //TODO: Make an HTTP request to the endpoint that adds the page with the caption to the provided page code
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
            {/* F1: CREATE AND EDIT DEPARTMENT */}
            <div>
                <h3 className="text-base text-black font-semibold"> F1: Create and Edit Department </h3>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Create Department </p>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-6">
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, createDepartmentName: e.target.value })} placeholder="Enter Department name" className="functionsInput" />
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, createManagerName: e.target.value })} placeholder="Enter Manager name" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleCreateDepartment} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Create
                </button>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Edit Department </p>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-6">
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, editSelectDepartment: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[250px] bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Depatment" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {/* {DEPARTMENTS.map((department) => {
                                return (
                                    <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem>
                                )
                            })} */}
                        </SelectContent>
                    </Select>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, editNewManagerUsername: e.target.value })} placeholder="New Manager username" className="functionsInput" />
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, editNewDepartmentName: e.target.value })} placeholder="New Department name" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleUpdateDepartment} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Update
                </button>
            </div>
            {/* F2: ASSIGN AND REMOVE MANAGER */}
            <div className="mt-10">
                <h3 className="text-base text-black font-semibold"> F2 : Assign and Remove Manager </h3>
                <p className="mt-7 text-base text-black font-semibold font-palanquin"> Assign Manager </p>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-4">
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, assignUsername: e.target.value })} placeholder="Enter username" className="functionsInput" />
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, assignSelectManager: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[250px] bg-button border border-gray-400 rounded-md max-sm:text-xs sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Manager" />
                        </SelectTrigger>
                        <SelectContent className="-pl-5">
                            {/* TODO:  NAMES OF THE MANAGER CANDIDATES SHOULD BE PLACED HERE */}
                            {/* <SelectItem value="Toshiro" className="text-sm text-black font-palanquin"> Toshiro </SelectItem> */}
                        </SelectContent>
                    </Select>
                </div>
                <button disabled={isLoading} onClick={handleAssignManager} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Assign
                </button>
                <p className="mt-7 text-base text-black font-semibold font-palanquin"> Remove Manager </p>
                <div className="flex flex-wrap items-center justify-start gap-6 mt-6">
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, removeSelectManager: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[250px] bg-button border border-gray-400 rounded-md max-sm:text-xs sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Manager" />
                        </SelectTrigger>
                        <SelectContent className="-pl-5">
                            {/* TODO:  NAMES OF THE MANAGER CANDIDATES SHOULD BE PLACED HERE */}
                            {/* <SelectItem value="Toshiro" className="text-sm text-black font-palanquin"> Toshiro </SelectItem> */}
                        </SelectContent>
                    </Select>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, removeUsername: e.target.value })} placeholder="Enter username" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleRemoveManager} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Remove
                </button>
            </div>
            {/* F3: ASSIGN AND REMOVE FUNCTION AUTHORITY */}
            <div className="mt-10">
                <h3 className="text-base text-black font-semibold"> F3: Assign and Remove Function Authority </h3>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Assign Function Authority </p>
                <div className="flex items-center justify-start gap-6 mt-6">
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, authoritySelectUsername: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[250px] bg-button border border-gray-400 rounded-md max-sm:text-xs sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Username" />
                        </SelectTrigger>
                        <SelectContent className="-pl-5">
                            {/* TODO: Place functions here */}
                        </SelectContent>
                    </Select>
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, authoritySelectFunction: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[250px] bg-button border border-gray-400 rounded-md max-sm:text-xs sm:px-3 py-2.5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Function" />
                        </SelectTrigger>
                        <SelectContent className="-pl-5">
                            {/* TODO: Place usernames here */}
                        </SelectContent>
                    </Select>
                </div>
                <button disabled={isLoading} onClick={handleAssignFunctionAuthority} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Assign
                </button>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Remove Function Authority </p>
                <div className="flex items-center justify-start gap-6 mt-6">
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, authorityRemoveFunction: value })}>
                        <SelectTrigger className="w-[250px] bg-button border border-gray-400 rounded-md px-3 py-2.5 focus-visible:outline-none max-sm:text-xs focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Function" />
                        </SelectTrigger>
                        <SelectContent className="-pl-5">
                            {/* TODO: Place usernames here */}
                        </SelectContent>
                    </Select>
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, authorityRemoveUsername: value })}>
                        <SelectTrigger className="w-[250px] bg-button border border-gray-400 rounded-md px-3 py-2.5 focus-visible:outline-none max-sm:text-xs focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Username" />
                        </SelectTrigger>
                        <SelectContent className="-pl-5">
                            {/* TODO: Place functions here */}
                        </SelectContent>
                    </Select>
                </div>
                <button disabled={isLoading} onClick={handleRemoveFunctionAuthority} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Remove
                </button>
            </div>
            {/* F4: HERO SECTION CHANGES */}
            <div className="mt-10">
                <h3 className="text-base text-black font-semibold"> F4: Hero Section Changes </h3>
                <p className="mt-7 text-base text-black font-palanquin"> Page code </p>
                <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, heroPageCode: e.target.value })} placeholder="Enter page code" className="functionsInput mt-4" />
                <h3 className="text-base text-black font-semibold font-palanquin mt-8 mb-2"> PG02 Welcome to Brother's Community</h3>
                <p className="mt-7 text-base text-black font-palanquin"> Caption </p>
                <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, heroCaption: e.target.value })} placeholder="Enter caption" className="mt-4 max-sm:w-[200px] sm:w-[300px] bg-button px-4 py-2 text-sm text-black rounded-md border border-gray-400 focus-visible:outline-none" />
                {/* PREVIEW */}
                <p className="mt-7 text-base text-black font-palanquin"> Preview </p>
                {/* TODO: once the page code is inserted, we display the featured image for that blog post below */}
                {/* TODO: the hero section can have around 7 images or more. we can delete one current image and put a new image. that's what we do here. */}
                {/* FAKE FEATURED IMAGE */}
                <Image src={FeaturedImage} alt="featured-image" width={180} height={130} className="rounded-sm mt-4" />
                <button disabled={isLoading} onClick={handleHeroAddPage} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2.5 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Add Page
                </button>
                <p className="mt-7 text-base text-black font-palanquin"> Hero section page list </p>
                <div className="w-[280px] h-[100px] mt-6 border border-gray-400 rounded-l-md px-5 py-4 overflow-y-scroll">
                    {/* TODO: Pages which have a hro section should be listed here. for now it's fake data  */}
                    <button className="flex items-center gap-4">
                        <p> page 1 </p>
                        <Checkbox checked={state.heroRemovePage === "page1"} onChange={() => setState({ ...state, heroRemovePage: "page1" })} className="w-4 h-4 rounded-[4px]" />
                    </button>
                    <button className="flex items-center gap-4 mt-3">
                        <p> page 2 </p>
                        <Checkbox checked={state.heroRemovePage === "page2"} onChange={() => setState({ ...state, heroRemovePage: "page2" })} className="w-4 h-4 rounded-[4px]" />
                    </button>
                </div>
                <button disabled={isLoading} onClick={handleRemoveHeroSectionPage} className="bg-navy mt-8 w-[140px] h-auto px-4 py-2.5 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Remove Page
                </button>
            </div>
        </section>
    )
}
