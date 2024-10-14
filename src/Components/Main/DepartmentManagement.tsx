'use client'

import { useEffect, useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"
import List from "../Small Pieces/List"
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "../ui/table"
import { MemberPositionType } from "@/constants"
import Link from "next/link"
import Pagination from "./Pagination"
import { message } from "antd"

type PositionType = {
    createSelectDepartment: string,
    createPositionTitle: string,
    createDescription: string,
    createCount: string,
    updateSelectDepartment: string,
    updatePositionTitle: string,
    updateDescription: string,
    updateCount: string,
    editSelectDetails: string,
    editDetailsName: string,
    editDescription: string,
    subSelectDepartment: string,
    subDepartmentName: string,
    subDescription: string,
    subManagerUsername: string,
    subDeleteDepartmentName: string,
    selectSubDepartmentManager: string,
    subAssignManager: string
}

interface Props {
    memeberApplication: {
        date: string,
        username: string,
        hours: string,
        description: {
            label: string,
            path: string
        },
        position: string,
    }[],
    memberJoin: {
        date: string,
        username: string,
        description: {
            label: string,
            path: string
        },
        position: string,
        removedAt?: string
    }[]
}

const InitialValue: PositionType = {
    createSelectDepartment: "",
    createPositionTitle: "",
    createDescription: "",
    createCount: "",
    updateSelectDepartment: "",
    updatePositionTitle: "",
    updateDescription: "",
    updateCount: "",
    editSelectDetails: "",
    editDetailsName: "",
    editDescription: "",
    subSelectDepartment: "",
    subDepartmentName: "",
    subDescription: "",
    subManagerUsername: "",
    subDeleteDepartmentName: "",
    selectSubDepartmentManager: "",
    subAssignManager: ""
}

export default function DepartmentManagement({ memeberApplication, memberJoin }: Props) {

    const [state, setState] = useState<PositionType>(InitialValue)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        // TODO: Setup debouncer
        if (state.updatePositionTitle) {
            //TODO: Fetch the position title data
        }
        if (state.editSelectDetails) {
            //TODO: Fetch the departmentDetails 

        }
    }, [state.updatePositionTitle, state.editSelectDetails])

    async function handleCreateDepartmentPosition() {
        // Check if data exists
        const allDataExists = Boolean(state.createSelectDepartment) && Boolean(state.createPositionTitle) && Boolean(state.createDescription) && Boolean(state.createCount)
        if (!allDataExists) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to create the department position
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleUpdateDepartmentPosition() {
        // Check if data exists
        const allDataExists = Boolean(state.updateSelectDepartment) && Boolean(state.updatePositionTitle) && Boolean(state.updateDescription) && Boolean(state.updateCount)
        if (!allDataExists) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to update the department position
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleUpdateDepartmentDetails() {
        // Check if data exists
        const allDataExists = Boolean(state.editSelectDetails) && Boolean(state.editDetailsName) && Boolean(state.editDescription)
        if (!allDataExists) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to update the department details
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }

    }

    async function handleCreateSubDepartment() {
        // Check if data exists
        const allDataExists = Boolean(state.subSelectDepartment) && Boolean(state.subDepartmentName) && Boolean(state.subDescription) && Boolean(state.subManagerUsername)
        if (!allDataExists) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to create a new sub department
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleDeleteSubDepartment() {
        if (!Boolean(state.subDeleteDepartmentName)) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to delete the sub department
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleAssignSubDepartmentManager() {
        if (!Boolean(state.selectSubDepartmentManager) || !Boolean(state.subAssignManager)) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to assign manager for the sub department
        try {

        }
        catch (error: any) {

        }
        finally {
            setIsLoading(false)
        }
    }

    async function handleRemoveSubDepartmentManager() {
        if (!Boolean(state.selectSubDepartmentManager) || !Boolean(state.subAssignManager)) {
            message.error("No data provided")
            return
        }
        setIsLoading(true)
        // TODO: Make an HTTP request to remove the manager form the sub department
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
            {/* TODO: Create a new state for this */}
            <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, createSelectDepartment: value })}>
                <SelectTrigger className="max-sm:w-[150px] sm:w-[180px] mt-6 bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                    <SelectValue placeholder="Select Depatment" />
                </SelectTrigger>
                <SelectContent className="">
                    {/* <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem> */}
                </SelectContent>
            </Select>
            {/* F11: CREATE AND EDIT DEPARTMENT POSITIONS */}
            <div className="mt-8">
                <h3 className="text-base text-black font-semibold max-sm:leading-8"> F11: Create and Edit Department Position </h3>
                {/* CREATE DEPARTMENT POSITION */}
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Create new department position </p>
                <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, createSelectDepartment: value })}>
                    <SelectTrigger className="max-sm:w-[150px] sm:w-[180px] mt-6 bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                        <SelectValue placeholder="Select Depatment" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {/* <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem> */}
                    </SelectContent>
                </Select>
                <div className="flex flex-wrap w-[310px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> Position title </label>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, createPositionTitle: e.target.value })} placeholder="Enter the new postion title" className="functionsInput" />
                </div>
                <div className="flex flex-wrap items-start gap-7 mt-10">
                    <label className="text-base text-black font-palanquin"> Description </label>
                    <textarea disabled={isLoading} onChange={(e) => setState({ ...state, createDescription: e.target.value })} placeholder="Enter description for the position" className="w-[280px] h-[140px] bg-button border border-gray-400 focus-visible:outline-none px-5 py-2.5 disabled:cursor-not-allowed rounded-md" />
                </div>
                <div className="flex flex-wrap w-[310px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> Count </label>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, createCount: e.target.value })} className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleCreateDepartmentPosition} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-emerald-50 disabled:cursor-not-allowed text-sm text-white">
                    Create
                </button>
                {/* EDIT DEPARTMENT POSITION */}
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Edit department position </p>
                <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, updateSelectDepartment: value })} >
                    <SelectTrigger className="max-sm:w-[150px] sm:w-[180px] mt-6 bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                        <SelectValue placeholder="Select Depatment" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {/* <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem> */}
                    </SelectContent>
                </Select>
                <div className="flex flex-wrap w-[310px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> Position title </label>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, updatePositionTitle: e.target.value })} className="functionsInput" />
                </div>
                <div className="flex flex-wrap items-start gap-7 mt-10">
                    <label className="text-base text-black font-palanquin"> Description </label>
                    <textarea disabled={isLoading} onChange={(e) => setState({ ...state, updateDescription: e.target.value })} className="w-[280px] h-[140px] bg-button border border-gray-400 disabled:cursor-not-allowed focus-visible:outline-none px-5 py-2.5 rounded-md" />
                </div>
                <div className="flex flex-wrap w-[310px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> Count </label>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, updateCount: e.target.value })} className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleCreateDepartmentPosition} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-emerald-50 disabled:cursor-not-allowed text-sm text-white">
                    Update
                </button>
            </div>
            {/* F12: Edit DEPARTMENT DETAILS */}
            <div className="mt-12">
                <h3 className="text-base text-black font-semibold"> F12: Edit Department Details </h3>
                <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, editSelectDetails: value })}>
                    <SelectTrigger className="max-sm:w-[150px] sm:w-[180px] mt-6 bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                        <SelectValue placeholder="Select Depatment" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {/* <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem> */}
                    </SelectContent>
                </Select>
                <div className="flex flex-wrap max-sm:w-[300px] sm:w-[400px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> New Department Name </label>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, editDetailsName: e.target.value })} className="functionsInput" />
                </div>
                <div className="flex flex-wrap items-start max-sm:gap-5 sm:gap-8 md:gap-12 lg:gap-14 mt-10">
                    <label className="text-base text-black font-palanquin"> Description </label>
                    <textarea disabled={isLoading} onChange={(e) => setState({ ...state, editDescription: e.target.value })} className="w-[280px] h-[140px] bg-button border disabled:cursor-not-allowed border-gray-400 focus-visible:outline-none px-5 py-2.5 rounded-md" />
                </div>
                <button disabled={isLoading} onClick={handleUpdateDepartmentDetails} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Update
                </button>
            </div>
            {/* F13: CREATE AND DELETE SUB DEPARTMENT */}
            <div className="mt-12">
                <h3 className="text-base text-black font-semibold max-sm:leading-8"> F13: Create and Delete Sub department </h3>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Create sub department </p>
                <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, subSelectDepartment: value })}>
                    <SelectTrigger className="max-sm:w-[150px] sm:w-[200px] mt-6 bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                        <SelectValue placeholder="Select Parent Depatment" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {/* <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem> */}
                    </SelectContent>
                </Select>
                <div className="flex flex-wrap max-sm:w-[300px] sm:w-[390px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> Sub Department Name </label>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, subDepartmentName: e.target.value })} className="functionsInput" />
                </div>
                <div className="flex flex-wrap items-start gap-8 mt-10">
                    <label className="text-base text-black font-palanquin"> Description </label>
                    <textarea disabled={isLoading} onChange={(e) => setState({ ...state, subDescription: e.target.value })} className="w-[280px] h-[140px] bg-button disabled:cursor-not-allowed border border-gray-400 focus-visible:outline-none px-5 py-2.5 rounded-md" />
                </div>
                <div className="flex flex-wrap max-sm:w-[300px] sm:w-[360px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> Manager username </label>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, subManagerUsername: e.target.value })} placeholder="Enter the new postion title" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleCreateSubDepartment} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Create
                </button>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Delete sub department </p>
                <div className="flex flex-wrap max-sm:w-[300px] sm:w-[390px] items-center max-sm:gap-8 sm:justify-between mt-10">
                    <label className="text-base text-black font-palanquin"> Sub Department Name </label>
                    <input type="text" placeholder="Name of the department" disabled={isLoading} onChange={(e) => setState({ ...state, subDeleteDepartmentName: e.target.value })} className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleDeleteSubDepartment} className="bg-red-200 mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-black font-semibold">
                    Delete
                </button>
            </div>
            {/* F14: ASSIGN AND DISMISS SUB DEPARTMENT MANAGER */}
            <div className="mt-12">
                <h3 className="text-base text-black font-semibold max-sm:leading-8"> F14: Assign and Dismiss Sub department Manager </h3>
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Assign sub department manager </p>
                {/* ASSIGN SUB DEPARTMENT MANAGER */}
                <div className="flex flex-wrap items-start gap-10 mt-10">
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, selectSubDepartmentManager: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[200px] bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Sub Depatment" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {/* <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem> */}
                        </SelectContent>
                    </Select>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, createPositionTitle: e.target.value })} placeholder="Enter manager username" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleAssignSubDepartmentManager} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none text-sm text-white">
                    Assign
                </button>
                {/* REMOVE SUB DEPARTMENT MANAGER */}
                <p className="mt-10 text-base text-black font-semibold font-palanquin"> Remove sub department manager </p>
                <div className="flex flex-wrap items-start gap-10 mt-10">
                    <Select disabled={isLoading} onValueChange={(value) => setState({ ...state, selectSubDepartmentManager: value })}>
                        <SelectTrigger className="max-sm:w-[150px] sm:w-[200px] bg-button border border-gray-400 max-sm:text-xs rounded-md sm:px-3 py-2.5 focus-visible:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-button focus:ring-0">
                            <SelectValue placeholder="Select Sub Depatment" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {/* <SelectItem key={department} value={department} className="text-sm text-black font-palanquin"> {department} </SelectItem> */}
                        </SelectContent>
                    </Select>
                    <input type="text" disabled={isLoading} onChange={(e) => setState({ ...state, createPositionTitle: e.target.value })} placeholder="Enter manager username" className="functionsInput" />
                </div>
                <button disabled={isLoading} onClick={handleRemoveSubDepartmentManager} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-none disabled:cursor-not-allowed text-sm text-white">
                    Remove
                </button>
            </div>
            {/* F15: ADD AND REMOVE DEPARTMENT MEMBER POSITION */}
            <div className="mt-12">
                <h3 className="text-base text-black font-semibold max-sm:leading-8"> F15: Add and Remove Department Member Position </h3>
                <List title="Member Application History" subList={true}>
                    <Table className="border border-gray-300">
                        <TableHeader>
                            <TableRow className="max-sm:text-sm sm:text-base font-medium">
                                <TableHead> Date </TableHead>
                                <TableHead className="text-center"> Username </TableHead>
                                <TableHead className="text-center"> Hours </TableHead>
                                <TableHead className="text-center"> Description </TableHead>
                                <TableHead className="text-center"> Position </TableHead>
                                <TableHead className="text-right w-[150px]"> Functions </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {memeberApplication.map((element, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium border border-gray-300"> {element.date} </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.username} </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.hours} </TableCell>
                                        <TableCell className="border border-gray-300 text-center">
                                            <Link href={`/${element.description.path}`} className="text-blue-600"> {element.description.label} </Link>
                                        </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.position} </TableCell>
                                        <TableCell className="border border-gray-300 text-center w-[150px]">
                                            {element.position === MemberPositionType.volunteer ? (
                                                <div className="flex flex-col items-start gap-3">
                                                    <p className="max-sm:text-sm sm:text-base text-black font-palanquin"> Not Vacant </p>
                                                    <button disabled={isLoading} className="border border-navy w-[80px] h-auto p-2 rounded-md focus-visible:outline-none text-sm text-navy">
                                                        Remove
                                                    </button>
                                                </div>
                                            ) :
                                                (
                                                    <div className="flex flex-col items-start gap-3">
                                                        <button disabled={isLoading} className="bg-navy w-[80px] h-auto p-2 text-sm text-white rounded-md focus-visible:outline-none">
                                                            Hire
                                                        </button>
                                                        <button disabled={isLoading} className="border border-navy w-[80px] h-auto p-2 rounded-md focus-visible:outline-none text-sm text-navy">
                                                            Remove
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <Pagination TotalNumberOfResults={20} pageSize={4} />
                </List>
                <List title="Member Join History" subList={true}>
                    <Table className="border border-gray-300">
                        <TableHeader>
                            <TableRow className="max-sm:text-sm sm:text-base font-medium">
                                <TableHead> Date </TableHead>
                                <TableHead className="text-center"> Username </TableHead>
                                <TableHead className="text-center"> Description </TableHead>
                                <TableHead className="text-center"> Position </TableHead>
                                <TableHead className="text-right w-[150px]"> Functions </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {memberJoin.map((element, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium border border-gray-300"> {element.date} </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.username} </TableCell>
                                        <TableCell className="border border-gray-300 text-center">
                                            <Link href={`/${element.description.path}`} className="text-blue-600"> {element.description.label} </Link>
                                        </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.position} </TableCell>
                                        <TableCell className="border border-gray-300 text-center w-[150px]">
                                            {element.removedAt ? (
                                                <p className="max-sm:text-sm sm:text-base text-black font-semibold font-palanquin"> Removed at {element.removedAt} </p>
                                            ) :
                                                (
                                                    <button disabled={isLoading} className="bg-navy w-[80px] h-auto p-2 text-sm text-white rounded-md focus-visible:outline-none">
                                                        Remove
                                                    </button>
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <Pagination TotalNumberOfResults={20} pageSize={4} />
                </List>
            </div>
        </section>

    )
}
