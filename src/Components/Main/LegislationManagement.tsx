'use client'

import validator from 'validator';
import { useState } from "react"
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "../ui/table"
import Pagination from "./Pagination"

interface Props {
    history: {
        date: string,
        managerName: string,
        article: string,
        reason: string
    }[]
    termsAndConditions: {
        title: string,
        description: string,
        additional_info?: string
    }[]
}

type TOS = {
    title: string,
    description: string,
    additional_info?: string
}[]

type TOSObject = Record<keyof TOS[0], string>;

export default function LegislationManagement({history, termsAndConditions} : Props) {

    const [content, setContent] = useState<TOS>(termsAndConditions)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleUpdateTermsAndConditions(){
        setIsLoading(true)
        //TODO: Make an HTTP request to update the terms and conditions
        try{

        }
        catch(error: any){

        }
        finally{
            setIsLoading(false)
        }
    }

    //  TODO: This function is not being excuted
    function handleChange(index: number, field: keyof TOSObject, value: string){
        // Sanitize the input value
        const sanitizedValue = validator.escape(value.trim());

        // Destructure the original content with a null check
        const updatedContent = [...(content ?? [])];
        // Check if there is a new policy/rule provided
        const newPolicy = !updatedContent[index]?.[field]?.includes(sanitizedValue);

        if(index === updatedContent.length && newPolicy && sanitizedValue !== '') {
            // Separate the content by new line
            const organizedData = sanitizedValue.split('\n').filter((line: string) => line.trim() !== '');

            if (organizedData.length >= 2) {
                const finalData = {
                    title: organizedData[0],
                    description: organizedData[1],
                    additional_info: organizedData[2] ? organizedData[2] : undefined,
                };
                // Add the new policy/rule to the array
                updatedContent.push(finalData);
            }
        } 
        else {
            // Update an existing property
            updatedContent[index][field] = sanitizedValue;
        }
        // Update the state with the new data
        setContent(updatedContent);
    }

    return (
        <section>
            {/* TABLE */}
            <div>
                <h3 className="text-base text-black font-semibold"> F17: Edit Legal Terms </h3>
                <p className="mt-7 text-base text-black font-palanquin"> Update history </p>
                <div className="mt-7">
                    <Table className="border border-gray-300">
                        <TableHeader>
                            <TableRow className="text-base font-medium">
                                <TableHead className="text-start md:w-[150px]"> Date </TableHead>
                                <TableHead className="text-center max-sm:text-sm"> Manager </TableHead>
                                <TableHead className="text-center max-sm:text-sm"> Article </TableHead>
                                <TableHead className="text-center max-sm:text-sm"> Reason </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.map((element, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium border border-gray-300"> {element.date} </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.managerName} </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.article} </TableCell>
                                        <TableCell className="border border-gray-300 text-center"> {element.reason} </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                    <Pagination TotalNumberOfResults={20} pageSize={4} />
                </div>
            </div>
            {/* TERMS AND CONDITIONS */}
            <div className="mt-10">
                <h3 className="text-base text-black font-semibold"> Legal Terms Overview </h3>
                <div contentEditable={true} className="mt-7 w-full h-[250px] border border-gray-400 rounded-l-md px-6 py-3 overflow-y-scroll overflow-x-hidden focus-visible:outline-none">
                    <p className="text-sm max-sm:text-justify leading-7 font-palanquin"> 
                        These Terms and Conditions govern your use of our website and any associated services offered through it. By accessing or using our website, you agree to be bounded by these Terms and Conditions. Please read them carefully before proceeding. If you do not agree to these Terms and Conditions, you may not use our website.
                    </p>
                    {/* STATIC DATA */}
                    { termsAndConditions.map((term, index) => {
                        return (
                            <div key={term.title} className="flex flex-col justify-start mt-3 text-black font-palanquin">
                                <h4 onChange={(e) => handleChange(index, "title", e.currentTarget.textContent || "")} className="text-base font-semibold"> {index + 1}. {term.title} </h4>
                                <p onInput={(e) => handleChange(index, "description", e.currentTarget.textContent || "")} className="mt-5 text-sm max-lg:break-all leading-6"> {term.description} </p>
                                {term.additional_info && <p onInput={(e) => handleChange(index, "additional_info", e.currentTarget.textContent || "")} className="mt-3 text-sm leading-6"> {term.additional_info} </p>}
                            </div>
                        )
                    })}
                </div>
                <button disabled={isLoading} onClick={handleUpdateTermsAndConditions} className="bg-navy mt-8 w-[100px] h-auto px-4 py-2 rounded-md focus-visible:outline-emerald-50 text-sm text-white disabled:cursor-not-allowed">
                    Update
                </button>
            </div>
        </section>
    )
}
