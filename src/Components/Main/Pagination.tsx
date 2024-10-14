"use client"

import { QUERY_PARAMS } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationProps {
    TotalNumberOfResults: number,
    pageSize: number
}

export default function Pagination({TotalNumberOfResults, pageSize}: PaginationProps) {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = parseInt(searchParams.get("page") || "1")
    const {replace} = useRouter()
    const Total_Number_OF_PAGES =  Math.ceil(TotalNumberOfResults / pageSize)
    /**
     * A function that chnages the current page into the Next page.
     */
    function handlePreviousPostsPage(){
        if(currentPage === 1) return
        const newPrevPage = currentPage - 1
        handleSetNewPage(newPrevPage)
    }

    /**
     * A function that chnages the current page into the previous page.
     */
    function handleNextPostsPage (){
        if(currentPage === Total_Number_OF_PAGES) return
        const newNextPage = currentPage + 1
        handleSetNewPage(newNextPage)
    }

    /**
     * A function that changes Page number.
     * @param : pageNumber: the  page that the user wants to see
     */
    function handleSetNewPage(pageNumber: number){
        const param = new URLSearchParams(searchParams);
        param.set(QUERY_PARAMS.page, pageNumber.toString());
        // update the URI
        replace(`${pathname}?${param.toString()}`)
    }

    return (
        <section className='w-full mt-14 flex justify-end'>
            {Total_Number_OF_PAGES  <= 1  ? null : 
            <>
                <button onClick={handlePreviousPostsPage} className="mr-6">
                    <IoIosArrowBack className="w-5 h-5 text-navy" />
                </button>
                <div className="flex items-center gap-5">
                    {Array.from({length: Total_Number_OF_PAGES}, (_, index) => index + 1).map((page_number) => {
                        return (
                            <button key={page_number} onClick={() => handleSetNewPage(page_number)}  className={`text-sm text-black ${currentPage === page_number ? "px-4 py-1.5 bg-navy text-white rounded-md" : null}`} > {page_number} </button>
                        )
                    })}
                </div>
                <button onClick={handleNextPostsPage} className="ml-6">
                    <IoIosArrowForward className="w-5 h-5 text-navy" />
                </button>
            </>
            }
        </section>
    )
}
