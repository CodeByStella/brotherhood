'use client'

import { useState } from "react"
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

interface ListProps {
    title: string,
    children: React.ReactNode,
    pagination?: React.ReactNode,
    subList?: boolean
}

export default function List({title, children, pagination, subList=false} : ListProps) {

    const [expand, setExpand] = useState<boolean>(false)
    
    return (
        <section className={`${subList ? "mt-3" : "mt-8"}`}>
            <div className={`${subList ? "px-2" : "max-sm:px-5 sm:px-7 md:px-10 "} bg-button w-full h-auto py-5 border-none rounded-md focus-visible:outline-none`}>
                <div className="flex items-start max-sm:gap-3 sm:gap-6">
                    <button onClick={() => setExpand((isExpanded) => !isExpanded)} className="p-3 rounded-full bg-green-50 flex justify-center">
                        {expand ?  <CiSquareMinus className="w-4 h-4 text-black" /> : <CiSquarePlus className="w-5 h-5 text-black" />}
                    </button>
                    <button onClick={() => setExpand((isExpanded) => !isExpanded)} className="focus-visible:outline-none border-none">
                        <h3 className="max-sm:text-base sm:text-lg text-black font-palanquin pt-2"> {title} </h3>
                    </button>
                </div>
            </div>
            {expand && <div className={`${subList ? "mt-1" : "mt-6"}`}>
                <div className={`${subList ? "px-2" : "max-sm:px-5 sm:px-7 md:px-10 "} bg-button w-full h-auto py-5 border-none rounded-md focus-visible:outline-none`}>
                    {children}
                </div>
                {pagination}
            </div>
            }
        </section>
    )
}
