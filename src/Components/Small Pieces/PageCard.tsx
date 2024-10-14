'use client'

import { useState } from "react";
import { CiFolderOn } from "react-icons/ci";
import { MdSupervisorAccount } from "react-icons/md";
import CatagoryContent from "./CatagoryContent";
import VisitorsContent from "./VisitorsContent";

interface Props {
    pages: {
        title: string,
        created_at: string,
        content: {
            id: number,
            type: string,
            name: string,
            publishedDate: string
        }[],
        stats: {
            monthly: number,
            averageMonthly: number,
            weekley: number,
            averageWeekly: number,
            daily: number,
            averageDaily: number,
            hourly: number,
            averageHourly: number
        },
        postsNotSubmitted : string [],
        postsPending: string[]
    }[]
}


export default function PageCard({pages} : Props) {

    const [currentCatgory, setCurrentCatagory] = useState<string>("")
    const [currentVisitor, setCurrentVisitor] = useState<number | "">("")

    function handleCatagorySelection(currentTitle: string){
        if(currentVisitor){
            setCurrentVisitor("")
        }
        setCurrentCatagory((curCatagory) => curCatagory === currentTitle ?  ""  :  currentTitle)
    }

    function handleVisitorSelection(currentIndex: number | ""){
        if(currentCatgory){
            setCurrentCatagory("")
        }
        setCurrentVisitor((curVisitor) => curVisitor === currentIndex ?  ""  : currentIndex)
    }

    return (
        <section>
            <div className="mt-10 flex flex-1 flex-col gap-4">
                {pages.map((page, index) => {
                    return (
                        <div key={page.title}>
                            <div className="bg-button border-none max-sm:px-5 sm:px-10 py-4 focus-visible:outline rounded-md flex flex-wrap max-sm:gap-5 items-start justify-between">
                                <div className="flex flex-col justify-start max-sm:gap-2">
                                    <h3 className="max-sm:text-base sm:text-lg text-navy font-semibold"> {page.title} </h3>
                                    <p className="text-sm text-stone-400"> {page.created_at} </p>
                                </div>
                                <div className="flex items-center max-sm:gap-1 sm:gap-5 md:gap-8">
                                    <div>
                                        <button onClick={() => handleCatagorySelection(page.title)} className={`flex items-start gap-2 ${currentCatgory === page.title ? "bg-orangeRed bg-opacity-10" : "bg-inherit"} focus-visible:outline-none rounded-md px-4 py-2`}>
                                            <CiFolderOn className="w-4 h-4 text-black" />
                                            <p className="text-sm text-black font-semibold"> category </p>
                                        </button>
                                        {currentCatgory === page.title && <hr className="border-2 border-t-orangeRed w-[50px] -mt-1 ml-10" />}
                                    </div>
                                    <div>
                                        <button onClick={() => handleVisitorSelection(index + 1)} className={`flex items-start gap-2 ${currentVisitor === index + 1  ? "bg-orangeRed bg-opacity-10" : "bg-inherit"} focus-visible:outline-none rounded-md px-3 py-2`}>
                                            <MdSupervisorAccount className="w-4 h-4 text-black" />
                                            <p className="text-sm text-black font-semibold"> visitors </p>
                                        </button>
                                        {currentVisitor === index + 1 && <hr className="border-2 border-t-orangeRed w-[50px] -mt-1 ml-7" />}
                                    </div>
                                </div>
                            </div>
                            {currentCatgory === page.title && <CatagoryContent contents={page.content} totalResults={10} postsNotSubmitted={page.postsNotSubmitted} postsPending={page.postsPending}  />}
                            {currentVisitor === index + 1 && <VisitorsContent stats={page.stats} />}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
